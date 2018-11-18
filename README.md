# gift-the-code
CapitalOne Hackathon For Charity  - banner service

# Usage
1. `cd banner-service`

2. bring up banner service container and redis container
banner service listens on 4000 and redis container listens on 6379
`
docker-compose build
docker-compose up -d
`

3. go to admin page to insert banner, in browser, type
`
http://localhost:4000/admin
`
4. follow the UI page to add banners

5. api to fetch those banner for each category
`
GET http://localhost:4000/banners?category=prostate_cancer
GET http://localhost:4000/banners?category=testicular_cancer
GET http://localhost:4000/banners?category=mental_health

`
6. api to fetch any category
`
GET http://localhost:4000/banners?category=<category_a>,<catefory_b>
`
