docker run --name nextjs-starter \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=nextjs-starter \
  -p 5432:5432 \
  -d postgres