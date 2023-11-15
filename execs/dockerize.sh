docker build . -t leaderboard_front_end
docker stop leaderboard_front_end_container
docker rm leaderboard_front_end_container
docker run --network=host --name leaderboard_front_end_container -p 49160:80 -d leaderboard_front_end
