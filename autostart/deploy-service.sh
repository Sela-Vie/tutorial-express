#!/bin/bash
set -e

# ===============================================
# SETUP
# ===============================================

absolute_file_path="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/$(basename -- "${BASH_SOURCE[0]}")"
absolute_directory_m0=$(dirname -- "$absolute_file_path")
absolute_directory_m1="$(cd "$absolute_directory_m0/.." && pwd)"

exec 2>>"$absolute_file_path.log"

# ===============================================

session_name="tut-express"

REPLACEE01="insert_working_directory_01"
REPLACER01="$absolute_directory_m0"
REPLACEE02="insert_working_directory_02"
REPLACER02="$absolute_directory_m0/run.sh"

FILE_TEMPLATE="$absolute_directory_m0/template.service"
FILE_OUTPUT_DIR="$HOME/.config/systemd/user"
FILE_OUTPUT="$FILE_OUTPUT_DIR/$session_name.service"

# ===============================================
# SCRIPT
# ===============================================

mkdir -p "$FILE_OUTPUT_DIR"

sed -e "s|$REPLACEE01|$REPLACER01|" -e "s|$REPLACEE02|$REPLACER02|" "$FILE_TEMPLATE" > "$FILE_OUTPUT"
systemctl --user daemon-reload
systemctl --user enable "$session_name.service"
systemctl --user start "$session_name.service"
