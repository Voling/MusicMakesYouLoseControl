import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyServ: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    // artist data
    this.spotifyServ.getArtist(this.artistId).then((retvalue) => {
      this.artist = retvalue;
      console.log(this.artist);
    });
    // related artists
    this.spotifyServ.getRelatedArtists(this.artistId).then((retvalue) => {
      this.relatedArtists = retvalue;
    });

    // top tracks for artist
    this.spotifyServ.getTopTracksForArtist(this.artistId).then((retvalue) => {
      this.topTracks = retvalue;
    });

    // artist's albums
    this.spotifyServ.getAlbumsForArtist(this.artistId).then((retvalue) => {
      this.albums = retvalue;
    });
  }

};