let accessToken = mapToken;


const map = new maplibregl.Map({
  container: 'map',
  style: "https://api.jawg.io/styles/jawg-streets.json?access-token=DQjyNj3TvXXKmVQ1jhsTog9Pb6Sy2tMuNYuSeDsjAczq5H4mRBKCzDRLd19ae1eA",
  zoom: 12,
  center: listing.geometry.coordinates,
});
maplibregl.setRTLTextPlugin(
'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js'
);


       // Basic popup definition
  const marker = new maplibregl.Marker({color : "#fe424d"})
            .setLngLat(listing.geometry.coordinates)
            .setPopup(
            new maplibregl.Popup({offset : 25})
            .setHTML(
              `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
            )
            ).addTo(map);
   

   
