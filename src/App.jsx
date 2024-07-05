// import React, { useState, useEffect } from 'react';
// import FacebookLoginButton from './Facebookbtn';
// import PageInsights from './catchinsight';
// import './index.css'; 


/*
MAJOR ISSUES

THE BUISNESS TYPE OF THE FACEBOOK API WOULDNT ALLOW THE APP TO BE WORKING ITS NOT FAULT OF THE CODE IVE TRIED WITH VANILLA REACT , VITE AND NEXT JS
 TO FECTH THE LOGIN WHEN THE APP TYPE IS SET TO CONSUMER IT WORKS BUT THE pages_show_list && pages_read_engagement CALLS
 CANNOT BE MADE SINCE THEY ARE EXCULISE TO THE BUISNESS TYPE , AND ALSO THEY REQUIRE ADVANCE ACCESS AND CODE REVIWEING I WAS
 ABLE TO CREAET A PAGE AND THEN SUCCESFULY FETCH THE DETAILS FROM TEH GRAPH QL OF THE BUISNESS TYPE FROM META BUT IT WONT WORK WHEN
 INTEGREATED , AS IT SAYS THE APP DOESNT EXIST OR APP IS NOT WORKING ERRROR , THIS IS A FAULT FEOM META SIDE ACCORDING TO MANY THREADS AND REQUEST OPENED 
 ON THE DEV FORM AND SINCE THIS ISSUE CANT BE FIXED FROM MY END IM LEAVING THE CODE AS IT IS , RIGHT NOW IT WILL BE ABLE TO LOGIN AND FETCH TEH NAME AND AVTAAR
 BUT THE PAGE DEATILS AND FECTHING HAVE BEEN IMPLTED ON TEH CODE IN TEH CATCHINSIGHT FUNCTION BUT FOR IT TO WORK , ADD THE KEY
 OF ANY APP IN THE BUISNESS MODE WITH REQURIED PERMESSIONS
 {pages_show_list && pages_read_engagement}

 TIME TAKEN FOR RESERCH  : 6 HOURS 

*/

// const App = () => {
//     //get the user named state
//     const [user, setUser] = useState(null);
//     const [pages, setPages] = useState([]); // dont set to null //=> linter error caught 
//     const [selectedPage, setSelectedPage] = useState(null);
//     const [insights, setInsights] = useState(null);

//     useEffect(() => {
//         if (user && user.accessToken) {
//             // Fetch the list of pages managed by the user
//             fetchPages(); // call the func to fetch the pagesxc
//         }
//     }, [user]);

//     const fetchPages = () => {
//         //fethc the account 
//         window.FB.api('/me/accounts', { access_token: user.accessToken }, (response) => {
//             if (response && !response.error) {
//                 setPages(response.data);
//             } else {
//                 console.error('Error in fetching the pages', response.error);
//             }
//         });
//     };

//     const handlePageChange = (e) => {
//         //error try catch --> fixed in post
//         const pageId = e.target.value;
//         setSelectedPage(pageId);
//         fetchPageInsights(pageId);
//     };

//     const fetchPageInsights = (pageId) => {
//         const since = '2023-01-01'; // date is set to manul adjustment 
//         const until = '2023-12-31';
//         const metrics = 'page_fans,page_engaged_users,page_impressions,page_reactions';
//         // meta for devs info //
//         //https://developers.facebook.com/docs/graph-api/reference/v20.0/insights --> source
//         window.FB.api(
//             `/${pageId}/insights`,
//             {
//                 access_token: user.accessToken,
//                 metric: metrics,
//                 since,
//                 until,
//                 period: 'day',
//             },
//             // error fixed ==> https://stackoverflow.com/questions/37163715/facebook-graph-api-object-insights-returning-no-data ref
//             (response) => {
//                 if (response && !response.error) {
//                     setInsights(response.data);
//                 } else {
//                     console.error('Error fetching page insights', response.error);
//                 }
//             }
//         );
//     };

//     return (
//         <div>
//             <h1>Facebook Login using React</h1>
//             {!user ? (
//                 <FacebookLoginButton setUser={setUser} />
//             ) : (
//                 <div>
//                     <div>
//                         <img src={user.picture} alt="User profile" />
//                         <h2>Welcome, {user.name}</h2>
//                     </div>
//                     <div>
//                         <h3>Select a page to see insights</h3>
//                         <select onChange={handlePageChange}>
//                             <option className='buton' value="">Select a page : </option>
//                             {pages.map((page) => (
//                                 <option key={page.id} value={page.id}>
//                                     {page.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     {selectedPage && insights && <PageInsights insights={insights} />}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default App;


/// ****** FIX FOUND https://stackoverflow.com/questions/75601813/it-looks-like-this-app-isnt-available-facebook-app-login-error#:~:text=In%20my%20case%2C%20I%20got,on%20Facebook%20Login%20for%20Business.&text=I%20think%20you're%20using,in%20your%20FB%20Login%20Button%20. **///

//trying with the post 
import React, { useState } from 'react';
import FacebookLoginButton from './Facebookbtn';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [insights, setInsights] = useState({});

  const fetchPageInsights = (pageId) => {
    FB.api(`/${pageId}/insights`, { metric: 'page_fans,page_engaged_users,page_impressions,page_reactions', period: 'day' }, function (response) {
      console.log('Page Insights:', response);
      if (response && !response.error) {
        setInsights({
          followers: response.data.find(insight => insight.name === 'page_fans').values[0].value,
          engagement: response.data.find(insight => insight.name === 'page_engaged_users').values[0].value,
          impressions: response.data.find(insight => insight.name === 'page_impressions').values[0].value,
          reactions: response.data.find(insight => insight.name === 'page_reactions').values[0].value
        });
      }
    });
  };

  return (
    <div>
      <h1>Facebook Login for Business</h1>
      <FacebookLoginButton setUser={setUser} setPages={setPages} />

      {user && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img src={user.picture} alt="Profile" />
        </div>
      )}

      {pages.length > 0 && (
        <div>
          <h3>Owned Pages</h3>
          <select onChange={(e) => fetchPageInsights(e.target.value)}>
            <option value="">Select a page</option>
            {pages.map(page => (
              <option key={page.id} value={page.id}>{page.name}</option>
            ))}
          </select>
        </div>
      )}

      {insights.followers && (
        <div>
          <h3>Page Insights</h3>
          <div>Total Followers: {insights.followers}</div>
          <div>Total Engagement: {insights.engagement}</div>
          <div>Total Impressions: {insights.impressions}</div>
          <div>Total Reactions: {insights.reactions}</div>
        </div>
      )}
    </div>
  );
};

export default App;
