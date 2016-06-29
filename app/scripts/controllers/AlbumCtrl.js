 (function() {
     function AlbumCtrl() {
         this.albumData = albumPicasso;
         this.tunes = [];
         for (var i = 0; i < this.albumData.songs.length; i++) {
             this.tunes.push(angular.copy(albumPicasso.songs[i]));
         }
     };
     
     angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
 })();
 
