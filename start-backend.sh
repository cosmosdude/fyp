clear
echo "# Current folder - '$PWD'"
echo "# Going to backend directory ..."
cd backend
echo "# Now in '$PWD'"
echo

echo "# Installing node_modules ..."
# install node modules
npm install --verbose
echo

echo "# Migrating Database"
npm run migrate
echo

echo "# Available API Routes"
npm run route:list
echo
# start node server
echo "# Starting BACKEND server ..."
npm run dev
