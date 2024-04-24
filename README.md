# ChatterBox

ChatterBox is a dynamic messaging platform designed to facilitate seamless communication and foster meaningful connections among users. Whether you're catching up with friends, collaborating with colleagues, or meeting new acquaintances, ChatterBox provides a vibrant and inclusive space for interaction.

## Overview

ChatterBox is a modern web application built with React.js and Node.js. It allows users to engage in real-time group chats, private messaging, and media sharing. The application features a user-friendly interface, emoji support, and multi-device compatibility.

## Features

**Working on**
- **Group Chats:** Engage in lively group conversations with friends, family, or colleagues.
- **Private Messaging:** Have private conversations with individuals in a secure environment.
- **Media Sharing:** Share photos, videos, and files to enhance communication.
- **Emoji and Stickers:** Express yourself with a wide range of emojis and stickers.
- **Multi-device Support:** Stay connected on your desktop, laptop, or mobile device.

## Tech Stack

ChatterBox is built using the following technologies:

- **Frontend:**
  - React.js: A JavaScript library for building user interfaces.
  - Material-UI: A React component library implementing Google's Material Design.
  - Emoji Picker: Library for adding emoji picker functionality to the application.
  - Axios: HTTP client for making API requests to the backend.
  - Auth0: Authentication and authorization platform for securing the application.

- **Backend:**
  - Node.js: A JavaScript runtime environment for building server-side applications.
  - Express.js: A web application framework for Node.js, used for building RESTful APIs.
  - PostgreSQL: A powerful, open-source relational database system for storing user data, messages, and other application information.
  - Sequelize: An ORM (Object-Relational Mapping) library for Node.js, used to interact with the PostgreSQL database.

**Working on**
- **Deployment:**
  - Docker: A containerization platform for packaging applications and their dependencies into containers.
  - Kubernetes: An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.
  - AWS (Amazon Web Services): Cloud services provider used for hosting and deploying the application.
  - NGINX: A web server and reverse proxy server for serving static content and routing requests to the backend.


**Why used this not that**
WebSocket itself doesn't provide the necessary features for efficient **real-time media streaming**, such as low latency, high throughput, and support for different codecs. For video and audio calls, you'll typically want to use specialized protocols and technologies designed specifically for real-time media streaming, such as WebRTC (Web Real-Time Communication).
## WebRTC offers several advantages for implementing video and audio call features:

- Low Latency: WebRTC is designed for low-latency communication, making it suitable for real-time applications like video and audio calls.

- High Quality: WebRTC supports high-quality audio and video codecs, ensuring a good user experience during calls.

- Peer-to-Peer Communication: WebRTC allows direct peer-to-peer communication between browsers, reducing the load on servers and improving scalability.

- Security: WebRTC includes built-in security features, such as encryption, to ensure the privacy and security of communication.

- Cross-Platform Support: WebRTC is supported by most modern web browsers and mobile platforms, making it suitable for building cross-platform applications.


## Getting Started

**Working on**
To get started with ChatterBox, simply [sign up](#) for an account or [log in](#) if you're already a member. Once logged in, you can start exploring the various features and functionalities of the application.

## Contributing

We welcome contributions from the community to enhance ChatterBox further. If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. We appreciate your contributions!

## Support

If you encounter any issues or have any questions about ChatterBox, please don't hesitate to [contact us](#). Our support team is here to assist you.

## License

ChatterBox is licensed under the [MIT License](LICENSE).
