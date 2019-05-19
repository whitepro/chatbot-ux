# chatbot-ux
Handlebars front-end for chatbot user experience

#### Directory Structure
```
├── index.js
├── package.json
├── public

│   ├── images
│   ├── css
│   ├── js
├── routes
├── dataJSON (Temporary data structures for enrollment chatbot demo)
├── controllers
└── views
    └── layouts
        └── main.handlebars
    └── partials (chatbot partials)
        └── components/
        └── eventCard.handlebars
        └── logoSection.handlebars
        └── multiselect.handlebars
    └── enrollment.handlebars
```

### Instructions
1. Install dependencies
```
$ npm install
```

2. Start Sever
```
$ npm run dev
```

3. Naviate Browser to:
http://localhost:5000/bot/bloom/enrollment/demo
