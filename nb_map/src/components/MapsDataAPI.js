import React, { Component } from 'react';

const api = 'https://api.foursquare.com/v2/venues/'

let token = localStorage.token

// creates a unique token.
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

class MapsDataAPI extends Component {
  state = {
    'Accept': 'application/json',
    'Authorization': token
  }

  /***
  * @description - handles the response from fetch requests.
  * @pram {bool} - response
  * @ return bool
  */
  handleErrors = (response) => {
   if(!response.ok) {
     console.log(response.statusText);
   }
   return response;
  }

  /***
  * @description - send a fetch request to the foursquare API. To get venues. 
  * @ return JSON object
  */
 getAllLocations = () => {
   return fetch(`${api}search?ll=51.481583,-3.179090&intent=browse&radius=5000&query=food&client_id=FSNWW3IXJFAIPEIB2J3A5GVFIJEYWOK3KVKYNYW2WGLDXZNH&client_secret=QMXCC3LBA5DN0IPY0YSVMXZPYSNM3XPQB1MEZF5HLZG31SFA&v=20181103`
   ).then(this.handleErrors)
   .then(res => res.json())
   .then(data => data.response.venues)
 }

}

export default MapsDataAPI;
