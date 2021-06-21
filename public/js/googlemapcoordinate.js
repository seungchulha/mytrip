let markers = [];

function initMap() {
    const myLatlng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });

    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    autocomplete.setFields(["place_id", "geometry", "formatted_address", "name"]);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow();

    const infoWindowContent = document.getElementById("infowindow-content");
    infoWindow.setContent(infoWindowContent);
    const marker = new google.maps.Marker({ map: map });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

    });

    function addMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
        });
        markers.push(marker);
    }

    function setMapOnAll(map) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }


    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {

        clearMarkers();
        addMarker(mapsMouseEvent.latLng);


        var coordinate = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
        var coordinateJSON = JSON.parse(coordinate);
        // Close the current InfoWindow.
        infoWindow.close();

        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );



        document.getElementById("latitude").value = coordinateJSON.lat;
        document.getElementById("longitude").value = coordinateJSON.lng;
        document.getElementById("coordinate").value = coordinate;

        infoWindow.open(map);
    });
}

// todo later
// 마커를 클릭 할때 해당 마커만 사라지게 하거나 혹은 마커 클릭시 발생하는 윈도우 내에서 마커 지우기 기능 추가
// 마커에 관련된 이미지를 마커와 한대 묶어서 저장
// 마커 클릭시 해당 좌표에 원하는 이름 등록