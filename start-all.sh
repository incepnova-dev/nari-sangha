#!/bin/bash

# Nari Sangha - Start All Services Script
# This script starts PostgreSQL, API server, Web app, Metro bundler, and Android emulator
# Usage: ./start-all.sh [OPTIONS]
#   (no options): Interactive mode - asks for preference
#   -l, --logs: Run services in background with logs
#   -t, --terminal: Open services in external terminal windows
#   -ide, --ide: Open services in IDE terminals (falls back to external if IDE not available)
#   -h, --help: Show this help message

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Parse arguments
MODE=""  # "logs", "terminal", "ide", or empty for interactive
TERMINAL_MODE=false
IDE_TERMINAL_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -l|--logs)
            if [ -n "$MODE" ] && [ "$MODE" != "logs" ]; then
                echo -e "${RED}Error: Conflicting options. Use only one mode flag.${NC}"
                echo "Use -h or --help for usage information"
                exit 1
            fi
            MODE="logs"
            shift
            ;;
        -t|--terminal)
            # Only set terminal mode if ide mode hasn't been set yet
            # If -ide comes later, it will override this
            if [ "$IDE_TERMINAL_MODE" = false ]; then
                MODE="terminal"
                TERMINAL_MODE=true
            fi
            shift
            ;;
        -ide|--ide)
            # IDE mode overrides terminal mode if -t was set earlier
            MODE="ide"
            TERMINAL_MODE=true
            IDE_TERMINAL_MODE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  (no options)     Interactive mode - asks for your preference"
            echo "  -l, --logs       Run services in background with logs"
            echo "  -t, --terminal   Open services in external terminal windows"
            echo "  -ide, --ide      Open services in IDE terminals (falls back to external if IDE not available)"
            echo "  -h, --help       Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0               # Interactive mode"
            echo "  $0 -l            # Background mode with logs"
            echo "  $0 -t            # External terminal windows"
            echo "  $0 -ide          # IDE terminal windows (falls back to external if IDE unavailable)"
            echo "  $0 -t -ide       # IDE terminal windows (-ide overrides -t)"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use -h or --help for usage information"
            exit 1
            ;;
    esac
done

# Get the script directory (root of the project)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Interactive mode - ask user for preference
if [ -z "$MODE" ]; then
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}Nari Sangha - Start All Services${NC}"
    echo -e "${CYAN}========================================${NC}"
    echo ""
    echo -e "${YELLOW}How would you like to run the services?${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} Background with logs (default)"
    echo -e "  ${GREEN}2)${NC} External terminal windows"
    echo -e "  ${GREEN}3)${NC} IDE terminal windows (falls back to external if IDE not available)"
    echo ""
    read -p "Enter your choice [1-3] (default: 1): " choice
    
    case "${choice:-1}" in
        1)
            MODE="logs"
            ;;
        2)
            MODE="terminal"
            TERMINAL_MODE=true
            ;;
        3)
            MODE="ide"
            TERMINAL_MODE=true
            IDE_TERMINAL_MODE=true
            ;;
        *)
            echo -e "${YELLOW}Invalid choice. Using default: Background with logs${NC}"
            MODE="logs"
            ;;
    esac
    echo ""
fi

# Create logs directory if needed
LOGS_DIR="$SCRIPT_DIR/logs"
if [ "$TERMINAL_MODE" = false ]; then
    mkdir -p "$LOGS_DIR"
fi

echo -e "${BLUE}========================================${NC}"
case "$MODE" in
    "logs")
        echo -e "${BLUE}Nari Sangha - Starting All Services (Background with Logs)${NC}"
        ;;
    "terminal")
        echo -e "${BLUE}Nari Sangha - Starting All Services (External Terminal Mode)${NC}"
        ;;
    "ide")
        echo -e "${BLUE}Nari Sangha - Starting All Services (IDE Terminal Mode)${NC}"
        ;;
    *)
        echo -e "${BLUE}Nari Sangha - Starting All Services${NC}"
        ;;
esac
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if running in IDE (VS Code or Cursor)
is_in_ide() {
    # Check for IDE environment variables
    if [[ -n "$VSCODE_IPC_HOOK_CLI" ]] || [[ -n "$CURSOR_IPC_HOOK_CLI" ]] || [[ -n "$VSCODE_INJECTION" ]] || [[ -n "$TERM_PROGRAM" && ("$TERM_PROGRAM" == "vscode" || "$TERM_PROGRAM" == "cursor") ]]; then
        return 0
    fi
    return 1
}

# Function to open a command in IDE terminal
open_in_ide_terminal() {
    local title="$1"
    local command="$2"
    local working_dir="$3"
    
    # Create a temporary script file to run the command (safer for special characters)
    local temp_script="$SCRIPT_DIR/.tmp-run-$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')-$$.sh"
    
    # Write the command to the script
    cat > "$temp_script" <<SCRIPTEOF
#!/bin/bash
cd '$working_dir'
echo "=== $title ==="
$command
SCRIPTEOF
    chmod +x "$temp_script"
    
    # On macOS, try to use AppleScript to interact with Cursor/VS Code
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # Try to use AppleScript to send keyboard shortcut to open new terminal in IDE
        # First, try to activate Cursor
        if osascript -e 'tell application "System Events" to get name of processes' 2>/dev/null | grep -qi "cursor"; then
            # Cursor is running - send Cmd+Shift+` to create new terminal, then run the script
            osascript <<EOF 2>/dev/null
tell application "Cursor"
    activate
end tell
tell application "System Events"
    tell process "Cursor"
        -- Send Cmd+Shift+` to create new terminal (common shortcut)
        keystroke "\`" using {command down, shift down}
        delay 0.8
        -- Send the script path
        keystroke "$temp_script"
        key code 36 -- Enter key
    end tell
end tell
EOF
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✓ $title opened in IDE terminal${NC}"
                return 0
            fi
        # Try VS Code as fallback
        elif osascript -e 'tell application "System Events" to get name of processes' 2>/dev/null | grep -qi "code"; then
            osascript <<EOF 2>/dev/null
tell application "Visual Studio Code"
    activate
end tell
tell application "System Events"
    tell process "Code"
        keystroke "\`" using {command down, shift down}
        delay 0.8
        keystroke "$temp_script"
        key code 36
    end tell
end tell
EOF
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✓ $title opened in IDE terminal${NC}"
                return 0
            fi
        fi
    fi
    
    # If AppleScript method didn't work, try CLI approach
    # Try to use Cursor/VS Code CLI
    if command_exists cursor; then
        # Try using cursor command line to open terminal
        if cursor --command "workbench.action.terminal.new" 2>/dev/null; then
            sleep 0.8
            cursor --command "workbench.action.terminal.sendSequence" --args "{\"text\":\"$temp_script\\r\"}" 2>/dev/null && {
                echo -e "${GREEN}✓ $title opened in IDE terminal${NC}"
                return 0
            }
        fi
    fi
    
    if command_exists code; then
        if code --command "workbench.action.terminal.new" 2>/dev/null; then
            sleep 0.8
            code --command "workbench.action.terminal.sendSequence" --args "{\"text\":\"$temp_script\\r\"}" 2>/dev/null && {
                echo -e "${GREEN}✓ $title opened in IDE terminal${NC}"
                return 0
            }
        fi
    fi
    
    # IDE terminal opening failed - return 1 to indicate fallback needed
    return 1
}

# Function to open a command in external terminal
open_in_external_terminal() {
    local title="$1"
    local command="$2"
    local working_dir="$3"
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS - use osascript to open new Terminal window
        osascript <<EOF
tell application "Terminal"
    activate
    do script "cd '$working_dir' && echo '=== $title ===' && $command"
end tell
EOF
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux - try different terminal emulators
        if command_exists gnome-terminal; then
            gnome-terminal --title="$title" -- bash -c "cd '$working_dir' && echo '=== $title ===' && $command; exec bash"
        elif command_exists xterm; then
            xterm -T "$title" -e bash -c "cd '$working_dir' && echo '=== $title ===' && $command; exec bash" &
        elif command_exists konsole; then
            konsole --title "$title" -e bash -c "cd '$working_dir' && echo '=== $title ===' && $command; exec bash" &
        else
            echo -e "${YELLOW}⚠ No supported terminal emulator found. Running in background instead.${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠ Unsupported OS. Running in background instead.${NC}"
        return 1
    fi
}

# Function to open a command in a new terminal window
open_in_terminal() {
    local title="$1"
    local command="$2"
    local working_dir="$3"
    
    # If IDE terminal mode is requested, try IDE first, then fall back to external
    if [ "$IDE_TERMINAL_MODE" = true ]; then
        # Check if we're actually in an IDE
        if is_in_ide; then
            # Try to open in IDE terminal
            if open_in_ide_terminal "$title" "$command" "$working_dir"; then
                return 0
            fi
            # IDE terminal failed - fall back to external terminal
            echo -e "${YELLOW}  IDE terminal not available, falling back to external terminal...${NC}"
        else
            # Not in IDE - fall back to external terminal
            echo -e "${YELLOW}  Not running in IDE, using external terminal...${NC}"
        fi
        # Fall through to external terminal
        open_in_external_terminal "$title" "$command" "$working_dir"
    else
        # External terminal mode - only use external terminals
        open_in_external_terminal "$title" "$command" "$working_dir"
    fi
}

# Function to check if PostgreSQL is running
check_postgres() {
    if command_exists pg_isready; then
        pg_isready -h localhost -p 5432 >/dev/null 2>&1
    elif [ -f "/opt/homebrew/opt/postgresql@16/bin/pg_isready" ]; then
        /opt/homebrew/opt/postgresql@16/bin/pg_isready -h localhost -p 5432 >/dev/null 2>&1
    elif [ -f "/usr/local/opt/postgresql@16/bin/pg_isready" ]; then
        /usr/local/opt/postgresql@16/bin/pg_isready -h localhost -p 5432 >/dev/null 2>&1
    else
        return 1
    fi
}

# Function to start PostgreSQL
start_postgresql() {
    echo -e "${YELLOW}[1/5] Starting PostgreSQL...${NC}"
    
    if check_postgres; then
        echo -e "${GREEN}✓ PostgreSQL is already running${NC}"
        return 0
    fi
    
    # Try to start PostgreSQL using brew services
    if command_exists brew; then
        echo -e "${YELLOW}  Starting PostgreSQL via brew services...${NC}"
        brew services start postgresql@16 2>/dev/null || {
            # Try without version
            brew services start postgresql 2>/dev/null || {
                echo -e "${RED}✗ Failed to start PostgreSQL via brew services${NC}"
                echo -e "${YELLOW}  Please start PostgreSQL manually: brew services start postgresql@16${NC}"
                return 1
            }
        }
        
        # Wait a bit for PostgreSQL to start
        sleep 3
        
        if check_postgres; then
            echo -e "${GREEN}✓ PostgreSQL started successfully${NC}"
        else
            echo -e "${YELLOW}⚠ PostgreSQL may still be starting. Continuing...${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Homebrew not found. Please start PostgreSQL manually${NC}"
        echo -e "${YELLOW}  Command: brew services start postgresql@16${NC}"
    fi
    echo ""
}

# Function to start API server
start_api_server() {
    echo -e "${YELLOW}[2/5] Starting API server...${NC}"
    
    if [ ! -d "apps/api" ]; then
        echo -e "${RED}✗ apps/api directory not found${NC}"
        return 1
    fi
    
    cd apps/api
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}✗ package.json not found in apps/api${NC}"
        cd "$SCRIPT_DIR"
        return 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}  Installing API dependencies...${NC}"
        npm install
    fi
    
    echo -e "${YELLOW}  Starting API server (npm run dev)...${NC}"
    echo -e "${BLUE}  API will be available at http://localhost:3001${NC}"
    
    if [ "$TERMINAL_MODE" = true ]; then
        # Open in new terminal window
        if open_in_terminal "API Server" "npm run dev" "$(pwd)"; then
            echo -e "${GREEN}✓ API server opened in new terminal window${NC}"
        else
            # Fallback to background if terminal opening fails
            npm run dev > "$LOGS_DIR/api-server.log" 2>&1 &
            API_PID=$!
            echo $API_PID > "$SCRIPT_DIR/.api-server.pid"
            echo -e "${GREEN}✓ API server started in background (PID: $API_PID)${NC}"
        fi
    else
        # Start in background and redirect output to logs directory
        npm run dev > "$LOGS_DIR/api-server.log" 2>&1 &
        API_PID=$!
        echo $API_PID > "$SCRIPT_DIR/.api-server.pid"
        echo -e "${GREEN}✓ API server started (PID: $API_PID)${NC}"
        echo -e "${YELLOW}  Logs: logs/api-server.log${NC}"
    fi
    
    cd "$SCRIPT_DIR"
    echo ""
}

# Function to start Web app server
start_web_server() {
    echo -e "${YELLOW}[3/5] Starting Web app server...${NC}"
    
    if [ ! -d "apps/web" ]; then
        echo -e "${RED}✗ apps/web directory not found${NC}"
        return 1
    fi
    
    cd apps/web
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}✗ package.json not found in apps/web${NC}"
        cd "$SCRIPT_DIR"
        return 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}  Installing Web app dependencies...${NC}"
        npm install
    fi
    
    echo -e "${YELLOW}  Starting Web app (npm start)...${NC}"
    echo -e "${BLUE}  Web app will be available at http://localhost:3000${NC}"
    
    if [ "$TERMINAL_MODE" = true ]; then
        # Open in new terminal window
        if open_in_terminal "Web App Server" "npm start" "$(pwd)"; then
            echo -e "${GREEN}✓ Web app server opened in new terminal window${NC}"
        else
            # Fallback to background if terminal opening fails
            npm start > "$LOGS_DIR/web-server.log" 2>&1 &
            WEB_PID=$!
            echo $WEB_PID > "$SCRIPT_DIR/.web-server.pid"
            echo -e "${GREEN}✓ Web app server started in background (PID: $WEB_PID)${NC}"
        fi
    else
        # Start in background and redirect output to logs directory
        npm start > "$LOGS_DIR/web-server.log" 2>&1 &
        WEB_PID=$!
        echo $WEB_PID > "$SCRIPT_DIR/.web-server.pid"
        echo -e "${GREEN}✓ Web app server started (PID: $WEB_PID)${NC}"
        echo -e "${YELLOW}  Logs: logs/web-server.log${NC}"
    fi
    
    cd "$SCRIPT_DIR"
    echo ""
}

# Function to start Metro bundler
start_metro() {
    echo -e "${YELLOW}[4/5] Starting Metro bundler...${NC}"
    
    if [ ! -d "apps/mobile" ]; then
        echo -e "${RED}✗ apps/mobile directory not found${NC}"
        return 1
    fi
    
    cd apps/mobile
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}✗ package.json not found in apps/mobile${NC}"
        cd "$SCRIPT_DIR"
        return 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}  Installing Mobile app dependencies...${NC}"
        npm install
    fi
    
    echo -e "${YELLOW}  Starting Metro bundler (npm start)...${NC}"
    
    if [ "$TERMINAL_MODE" = true ]; then
        # Open in new terminal window
        if open_in_terminal "Metro Bundler" "npm start" "$(pwd)"; then
            echo -e "${GREEN}✓ Metro bundler opened in new terminal window${NC}"
        else
            # Fallback to background if terminal opening fails
            npm start > "$LOGS_DIR/metro-server.log" 2>&1 &
            METRO_PID=$!
            echo $METRO_PID > "$SCRIPT_DIR/.metro-server.pid"
            echo -e "${GREEN}✓ Metro bundler started in background (PID: $METRO_PID)${NC}"
        fi
    else
        # Start in background and redirect output to logs directory
        npm start > "$LOGS_DIR/metro-server.log" 2>&1 &
        METRO_PID=$!
        echo $METRO_PID > "$SCRIPT_DIR/.metro-server.pid"
        echo -e "${GREEN}✓ Metro bundler started (PID: $METRO_PID)${NC}"
        echo -e "${YELLOW}  Logs: logs/metro-server.log${NC}"
    fi
    
    cd "$SCRIPT_DIR"
    echo ""
}

# Function to find and start Android emulator
start_android_emulator() {
    echo -e "${YELLOW}[5/5] Starting Android emulator...${NC}"
    
    # Find emulator command
    EMULATOR_CMD=""
    if command_exists emulator; then
        EMULATOR_CMD="emulator"
    elif [ -n "$ANDROID_HOME" ] && [ -f "$ANDROID_HOME/emulator/emulator" ]; then
        EMULATOR_CMD="$ANDROID_HOME/emulator/emulator"
    elif [ -n "$ANDROID_SDK_ROOT" ] && [ -f "$ANDROID_SDK_ROOT/emulator/emulator" ]; then
        EMULATOR_CMD="$ANDROID_SDK_ROOT/emulator/emulator"
    else
        echo -e "${RED}✗ Android emulator not found in PATH or ANDROID_HOME${NC}"
        echo -e "${YELLOW}  Please ensure Android SDK is installed and emulator is in your PATH${NC}"
        echo -e "${YELLOW}  Or set ANDROID_HOME environment variable${NC}"
        return 1
    fi
    
    # List available AVDs
    echo -e "${YELLOW}  Checking for available Android Virtual Devices...${NC}"
    AVD_LIST=$($EMULATOR_CMD -list-avds 2>/dev/null || echo "")
    
    if [ -z "$AVD_LIST" ]; then
        echo -e "${RED}✗ No Android Virtual Devices found${NC}"
        echo -e "${YELLOW}  Please create an AVD using Android Studio:${NC}"
        echo -e "${YELLOW}  Tools → Device Manager → Create Device${NC}"
        return 1
    fi
    
    # Get first AVD or use provided one
    FIRST_AVD=$(echo "$AVD_LIST" | head -n 1)
    
    # Check if emulator is already running
    if command_exists adb; then
        RUNNING_DEVICES=$(adb devices | grep -v "List of devices" | grep "device$" | wc -l | tr -d ' ')
        if [ "$RUNNING_DEVICES" -gt 0 ]; then
            echo -e "${GREEN}✓ Android emulator is already running${NC}"
            adb devices
            return 0
        fi
    fi
    
    echo -e "${YELLOW}  Starting emulator: $FIRST_AVD${NC}"
    echo -e "${BLUE}  This may take a minute...${NC}"
    
    if [ "$TERMINAL_MODE" = true ]; then
        # Open in new terminal window
        if open_in_terminal "Android Emulator" "$EMULATOR_CMD -avd \"$FIRST_AVD\"" "$SCRIPT_DIR"; then
            echo -e "${GREEN}✓ Android emulator opened in new terminal window${NC}"
            echo -e "${YELLOW}  Note: Emulator may take 30-60 seconds to fully boot${NC}"
        else
            # Fallback to background if terminal opening fails
            $EMULATOR_CMD -avd "$FIRST_AVD" > "$LOGS_DIR/emulator.log" 2>&1 &
            EMULATOR_PID=$!
            echo $EMULATOR_PID > "$SCRIPT_DIR/.emulator.pid"
            echo -e "${GREEN}✓ Android emulator starting in background (PID: $EMULATOR_PID)${NC}"
            echo -e "${YELLOW}  Logs: logs/emulator.log${NC}"
            echo -e "${YELLOW}  Note: Emulator may take 30-60 seconds to fully boot${NC}"
        fi
    else
        # Start emulator in background and redirect output to logs directory
        $EMULATOR_CMD -avd "$FIRST_AVD" > "$LOGS_DIR/emulator.log" 2>&1 &
        EMULATOR_PID=$!
        echo $EMULATOR_PID > "$SCRIPT_DIR/.emulator.pid"
        echo -e "${GREEN}✓ Android emulator starting (PID: $EMULATOR_PID)${NC}"
        echo -e "${YELLOW}  Logs: logs/emulator.log${NC}"
        echo -e "${YELLOW}  Note: Emulator may take 30-60 seconds to fully boot${NC}"
    fi
    
    echo ""
}

# Function to create stop script
create_stop_script() {
    cat > "$SCRIPT_DIR/stop-all.sh" << 'STOP_EOF'
#!/bin/bash

# Nari Sangha - Stop All Services Script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Stopping all Nari Sangha services..."

# Stop API server
if [ -f ".api-server.pid" ]; then
    API_PID=$(cat .api-server.pid)
    if kill -0 "$API_PID" 2>/dev/null; then
        echo "Stopping API server (PID: $API_PID)..."
        kill "$API_PID"
        rm .api-server.pid
    fi
fi

# Stop Web server
if [ -f ".web-server.pid" ]; then
    WEB_PID=$(cat .web-server.pid)
    if kill -0 "$WEB_PID" 2>/dev/null; then
        echo "Stopping Web server (PID: $WEB_PID)..."
        kill "$WEB_PID"
        rm .web-server.pid
    fi
fi

# Stop Metro bundler
if [ -f ".metro-server.pid" ]; then
    METRO_PID=$(cat .metro-server.pid)
    if kill -0 "$METRO_PID" 2>/dev/null; then
        echo "Stopping Metro bundler (PID: $METRO_PID)..."
        kill "$METRO_PID"
        rm .metro-server.pid
    fi
fi

# Stop Emulator
if [ -f ".emulator.pid" ]; then
    EMULATOR_PID=$(cat .emulator.pid)
    if kill -0 "$EMULATOR_PID" 2>/dev/null; then
        echo "Stopping Android emulator (PID: $EMULATOR_PID)..."
        kill "$EMULATOR_PID"
        rm .emulator.pid
    fi
fi

# Stop PostgreSQL (optional - comment out if you want to keep it running)
# echo "Stopping PostgreSQL..."
# brew services stop postgresql@16 2>/dev/null || true

echo "Done!"
STOP_EOF
    chmod +x "$SCRIPT_DIR/stop-all.sh"
    echo -e "${GREEN}✓ Created stop-all.sh script${NC}"
}

# Main execution
main() {
    start_postgresql
    start_api_server
    start_web_server
    start_metro
    start_android_emulator
    create_stop_script
    
    echo -e "${BLUE}========================================${NC}"
    echo -e "${GREEN}All services started!${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "${YELLOW}Services:${NC}"
    echo -e "  • PostgreSQL: Running in background"
    
    if [ "$TERMINAL_MODE" = true ]; then
        if [ "$IDE_TERMINAL_MODE" = true ]; then
            echo -e "  • API Server: http://localhost:3001 (Running in IDE terminal)"
            echo -e "  • Web App: http://localhost:3000 (Running in IDE terminal)"
            echo -e "  • Metro Bundler: Running in IDE terminal"
            echo -e "  • Android Emulator: Starting in IDE terminal"
            echo ""
            echo -e "${YELLOW}Note:${NC}"
            echo -e "  All services are running in separate IDE terminal tabs."
            echo -e "  You can interact with each service directly in its terminal."
        else
            echo -e "  • API Server: http://localhost:3001 (Running in external terminal window)"
            echo -e "  • Web App: http://localhost:3000 (Running in external terminal window)"
            echo -e "  • Metro Bundler: Running in external terminal window"
            echo -e "  • Android Emulator: Starting in external terminal window"
            echo ""
            echo -e "${YELLOW}Note:${NC}"
            echo -e "  All services are running in separate external terminal windows."
            echo -e "  You can interact with each service directly in its terminal."
        fi
    else
        echo -e "  • API Server: http://localhost:3001 (PID: $(cat .api-server.pid 2>/dev/null || echo 'N/A'))"
        echo -e "  • Web App: http://localhost:3000 (PID: $(cat .web-server.pid 2>/dev/null || echo 'N/A'))"
        echo -e "  • Metro Bundler: Running (PID: $(cat .metro-server.pid 2>/dev/null || echo 'N/A'))"
        echo -e "  • Android Emulator: Starting (PID: $(cat .emulator.pid 2>/dev/null || echo 'N/A'))"
        echo ""
        echo -e "${YELLOW}Logs Directory:${NC}"
        echo -e "  📁 logs/${NC}"
        echo -e "${YELLOW}Log Files:${NC}"
        echo -e "  • API: logs/api-server.log"
        echo -e "  • Web: logs/web-server.log"
        echo -e "  • Metro: logs/metro-server.log"
        echo -e "  • Emulator: logs/emulator.log"
    fi
    echo ""
    echo -e "${YELLOW}To stop all services, run:${NC}"
    echo -e "  ./stop-all.sh"
    echo ""
    echo -e "${YELLOW}To build and run the mobile app on the emulator:${NC}"
    echo -e "  cd apps/mobile && npm run android"
    echo ""
}

# Run main function
main

