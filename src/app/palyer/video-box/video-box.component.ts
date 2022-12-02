import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { VideoBox } from '../models/video-box.model';
import { VideoModel } from '../models/video.model';

@Component({
  selector: 'vpl-video-box',
  templateUrl: './video-box.component.html',
  styleUrls: ['./video-box.component.scss']
})
export class VideoBoxComponent implements OnInit {

  @Input() item!: VideoBox | VideoModel;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  onSelectImage(id: number) {
    this.playerService.onSelectVideo(id);
  }

}
