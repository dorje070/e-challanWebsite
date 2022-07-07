import React from 'react';
import NepaliPolice from '../images/NepaliPolice.png';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className=" text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-md-3 col-lg-3 row NepalPolice ">
            <img
              src={NepaliPolice}
              alt="Nepali police logo"
              className="NepaliPoliceimg px-0"
            ></img>
            <div className="col px-0">
              <h5 className="mt-4">Nepali Traffic</h5>
              <h5> Police</h5>
            </div>
          </div>
          <div className="col-md-3 col-lg-xl-2 mx-auto mt-2 ">
            <h5 className="text -uppercase mb-3 font-weight-bold ">Memeber</h5>

            <ul className="memberlist row ">
              <div className="col members">
                <li>Dorje Tamang</li>
                <li>Dikshan Dangol</li>
                <li>sobudh Yadav</li>
              </div>
              <div className="col members">
                <li>Palden Gysato Lama</li>
                <li>Suman Sherstha</li>
              </div>
            </ul>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-2">
            <h5 className="text -uppercase mb-3 font-weight-bold ">
              follow us
            </h5>
            <ul className="list-inline">
              <li>
                <a href="https://www.youtube.com/">
                  <icon className="mx-3">
                    <FaYoutube />
                  </icon>
                  Youtube
                </a>
              </li>

              <li>
                <a href="https://www.facebook.com/">
                  <icon className="mx-3">
                    <FaFacebook />
                  </icon>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/">
                  <icon className="mx-3">
                    <FaTwitter />
                  </icon>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
