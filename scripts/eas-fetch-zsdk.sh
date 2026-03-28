#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SDK_DIR="${ROOT_DIR}/packages/react-native-zebra-linkos-official/ios/ZSDK_API.xcframework"
SDK_PLIST="${SDK_DIR}/Info.plist"

# Local convenience: load environment variables from .env.local/.env if present.
# EAS builders will already inject env vars; this mainly helps `npm run ios` locally.
if [ -z "${ZSDK_ZIP_URL:-}" ]; then
  for ENV_FILE in "${ROOT_DIR}/.env.local" "${ROOT_DIR}/.env"; do
    if [ -f "${ENV_FILE}" ]; then
      # shellcheck disable=SC1090
      set -a
      . "${ENV_FILE}" || true
      set +a
      break
    fi
  done
fi

if [ -f "${SDK_PLIST}" ]; then
  echo "ZSDK_API.xcframework already present."
  exit 0
fi

if [ -z "${ZSDK_ZIP_URL:-}" ]; then
  echo "ZSDK_API.xcframework is not present and ZSDK_ZIP_URL is not set."
  echo "Continuing without Zebra SDK (build may succeed but runtime will throw E_ZSDK_UNAVAILABLE)."
  exit 0
fi

echo "Fetching Zebra Link-OS SDK from ZSDK_ZIP_URL..."
TMP_DIR="$(mktemp -d)"
ZIP_PATH="${TMP_DIR}/zsdk.zip"

curl -fsSL -L "${ZSDK_ZIP_URL}" -o "${ZIP_PATH}"

# Unzip and locate the xcframework inside.
unzip -q "${ZIP_PATH}" -d "${TMP_DIR}/unzipped"
FOUND_PATH="$(find "${TMP_DIR}/unzipped" -type d -name "ZSDK_API.xcframework" -maxdepth 6 | head -n 1)"

if [ -z "${FOUND_PATH}" ]; then
  echo "Failed to find ZSDK_API.xcframework inside downloaded zip."
  exit 1
fi

mkdir -p "$(dirname "${SDK_DIR}")"
rm -rf "${SDK_DIR}"
cp -R "${FOUND_PATH}" "${SDK_DIR}"

echo "Installed ZSDK_API.xcframework to ${SDK_DIR}"
