(function() {
    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);

    function Fixtures() {

        var Fixtures = {};

        var albumPicasso = {
            name: 'Mixes',
            year: '2017',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs:
            [
                { name: '80s Soul n Funk', length: '3603', audioUrl: 'assets/music/80sfunk'}
            ]
        };

        Fixtures.getAlbum = function() {
            return albumPicasso;
        };

        Fixtures.getCollection = function(numberOfAlbums) {
            var albums = [];
            for (var i = 0; i < numberOfAlbums; i++) {
                albums.push(albumPicasso);
            }
            return albums;
        };

        return Fixtures;

        };

})();
