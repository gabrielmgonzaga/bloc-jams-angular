(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        @desc Stores album information to move between songs
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Play a song
        * @param {Object} song
        */
        var playSong = function(song) {
            if (currentBuzzObject)
                currentBuzzObject.play();
                song.playing = true;
        };
        
         /**
        * @function stopSong
        * @desc Stop a song
        * @param {Object} song
        */ 
        var stopSong = function(song) {
                currentBuzzObject.stop();
                song.playing = null;
        };
        
        /**
        @function getSongIndex
        @desc gets the index of the song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        // Public 
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            // Conditional which checks if current song is equal to song
            } else if (SongPlayer.currentSong === song) {
                // Conditional assumption; if user can trigger play button, then song must be paused
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        // Function that pauses
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc switches to the previous song
        * @param 
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            // Decrease current song index by 1
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next song
        * @desc Set song to next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong)
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length - 1;
            
            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);            
            }
        };
        
        return SongPlayer;
    };
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();