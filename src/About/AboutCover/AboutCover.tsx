import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import './AboutCover.css';

class AboutCover extends Component<any, any> {
  coverStyles: Object = {}

  constructor(props: any, state: any) {
    super(props, state);


    this.coverStyles = {
      'backgroundImage': this.getRandomCoverUrl()
    };
  };

  getRandomCoverUrl(): string {
    let rnd = Math.floor(Math.random() * 9); // between 0 and 9
    const urls = [
      'pexels-photo-159888.jpeg',
      'pexels-photo-265087.jpeg',
      'pexels-photo-577585.jpeg',
      'pexels-photo-669615.jpeg',
      'pexels-photo-669619.jpeg',
      'pexels-photo-1148820.jpeg',
      'pexels-photo-1342460.jpeg',
      'pexels-photo-1509428.jpeg',
      'pexels-photo-1516704.jpeg'
    ];

    return "url('./img/" + urls[rnd] + "')";
  };

  onReadMoreClick(): void {
    var element = document.getElementById('what-is-this');
    if (element) {
      element.scrollIntoView();
    }
  };

  render() {
    return (
      <div className="cover" style={this.coverStyles}>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Journalist</h1>
            <p className="lead font-weight-normal">
              Investigate and find interesting details from your data!
            </p>
            <Button variant="light" type="submit">Query your data</Button>
            <Button variant="light" type="submit">Send some events</Button>
            <div>
              <Button variant="outline-light" type="submit" className="read-more-button" onClick={this.onReadMoreClick.bind(this)}>What is this anyway?</Button>
            </div>
          </div>
          <div className="product-device box-shadow d-none d-md-block"></div>
          <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>
      </div>
    );
  };

}

export default AboutCover;
