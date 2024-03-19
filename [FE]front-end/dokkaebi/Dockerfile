FROM node:20
# 경로 설정하기
WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

# 5173번 포트 노출
EXPOSE 5173

# npm start 스크립트 실행
CMD ["npm", "start"]
