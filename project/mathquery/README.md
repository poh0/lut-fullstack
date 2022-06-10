# Mathquery

Simple question and answer forum for mathematicians.

[Link to showcase video](https://drive.google.com/file/d/1yICygA_PCul9Zca1_FZQQxVUyUrnDU0Z/view?usp=sharing) (Google Drive)

### Run production build locally:

Install Angular CLI if you don't have it

```sh
npm install -g @angular/cli
```

Clone this repository:

```sh
git clone https://github.com/poh0/lut-fullstack
```

Go to the project folder

```sh
cd lut-fullstack/project/mathquery
```

Rename `.env.example` to `.env` and fill in your environment variables:

```sh
PORT = <Port number where you want to run this project>
MONGO_URI = <Connection string to your mongodb server>
JWT_SECRET = <random string>
```

Install dependencies for both backend and frontend
```sh
npm install && cd angular-src && npm install
```

In the root of the project run the build script to create a production build

```sh
npm run build
```
Start production build:

```sh
npm start
```
Then locate to `http://localhost:<PORT>`
