(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        var currentSong = null;
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
            });
            
            currentSong = song;
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
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
            // Conditional which checks if current song is equal to song
            } else if (currentSong === song){
                // Conditional assumption; if user can trigger play button, then song must be paused
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        // Function that pauses
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    };
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();