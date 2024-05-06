"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const videos_repository_1 = require("../modules/videos/repositories/videos.repository");
const login_1 = require("../middleware/login");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videosRepository = new videos_repository_1.VideoRepository();
videosRoutes.post('/create-video', login_1.login, (request, response) => {
    videosRepository.create(request, response);
});
videosRoutes.get('/get-videos', login_1.login, (request, response) => {
    videosRepository.getVideos(request, response);
});
videosRoutes.get('/search', (request, response) => {
    videosRepository.searchVideos(request, response);
});