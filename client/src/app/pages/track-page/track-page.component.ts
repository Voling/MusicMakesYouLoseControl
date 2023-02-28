import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyServ: SpotifyService) { }
  makePercent(num) {
    num*=100;
    return parseFloat(num).toFixed(2)+'%';
  }
  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    
    this.spotifyServ.getTrack(this.trackId).then((retvalue) => {
      this.track = retvalue;
      this.trackId = retvalue.id;
    });

    this.spotifyServ.getAudioFeaturesForTrack(this.trackId).then((retvalue) => {
      this.audioFeatures = retvalue;
    });
  }

}
