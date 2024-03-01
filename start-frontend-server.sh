clear
echo "[log]: Current folder - '$PWD'"
echo "[log]: Going to frontend directory ..."
cd frontend
echo "[log]: Now in '$PWD'"

echo "[log]: Installing node_modules ..."
# install node modules
npm install --verbose

# start node server
echo "[log]: Starting FRONTEND server ..."
npm run dev
