import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    const url = this.expressBaseUrl + endpoint
    console.log(url);
    return this.http.get(url).toPromise();
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    const endpoint = `/search/${category}/${encodeURIComponent(resource)}`;
    return this.sendRequestToExpress(endpoint).then((info) => {
      console.log("req success:")
      console.log(info);
      switch (category) {
        case "artist":
          return info.artists.items.map((data) => new ArtistData(data));
          break;
        case "track":
          return info.tracks.items.map((data) => new TrackData(data));
          break;
        case "album":
          return info.albums.items.map((data) => new AlbumData(data));
          break;
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const endpoint = `/artist/${encodeURIComponent(artistId)}`;
    console.log("getArtist")
    return this.sendRequestToExpress(endpoint).then((info) => new ArtistData(info));
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    //?
    const endpoint = `/artist-related-artists/${encodeURIComponent(artistId)}`;
    console.log("getRelatedArtists")
    return this.sendRequestToExpress(endpoint).then((info) => info.artists.map((artist) => new ArtistData(artist)));
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //?
    const endpoint = `/artist-top-tracks/${encodeURIComponent(artistId)}/`;
    console.log("getTopTracksForArtist")
    return this.sendRequestToExpress(endpoint).then((info) => info.tracks)
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    //?
    const endpoint = `/artist-albums/${encodeURIComponent(artistId)}`
    console.log("getAlbumsForArtist")
    return this.sendRequestToExpress(endpoint).then((info) => info.items.map((album) => new AlbumData(album)));
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const endpoint = `/album/${encodeURIComponent(albumId)}`
    console.log("getAlbum")
    return this.sendRequestToExpress(endpoint).then((info) => new AlbumData(info));
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    //?
    const endpoint = `/album-tracks/${encodeURIComponent(albumId)}/`
    return this.sendRequestToExpress(endpoint).then((info) => info.items);
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const endpoint = `/track/${encodeURIComponent(trackId)}`
    console.log("getTrack")
    return this.sendRequestToExpress(endpoint).then((info) => new TrackData(info));
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    const endpoint = `/track-audio-features/${encodeURIComponent(trackId)}`
    console.log("getAudioFeaturesForTrack")
    return this.sendRequestToExpress(endpoint).then((info) => {
      var featureList = []
      console.log(info)
      TrackFeature.FeatureTypes.forEach((feat) => {
        featureList.push(new TrackFeature(feat, info[feat]))
      })
      return featureList;
    });
  }
}
