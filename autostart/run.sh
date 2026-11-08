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
# DOCKER CHECK
# ===============================================

docker_timeout=180
if ! timeout "$docker_timeout" bash -c 'while ! docker info >/dev/null 2>&1; do sleep 2; done'; then
    echo "Docker did not become ready within $docker_timeout seconds" >&2
    exit 1
fi

# ===============================================
# CUSTOM VARS
# ===============================================

session_name="tut-express"

# ===============================================
# FUNCTIONS
# ===============================================

tmux new-session -A -d -s "$session_name" -c "$absolute_directory_m1" || true
tmux_send_keys() {
    tmux send-keys -t "$session_name" "$1" C-m
}

# ===============================================
# SCRIPT
# ===============================================

tmux_send_keys "docker compose --project-name $session_name up -d"
tmux_send_keys "npm run dev"