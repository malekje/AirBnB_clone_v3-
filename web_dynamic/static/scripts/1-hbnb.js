$(document).ready(function() {
    let amenities = {};
    $('input[type="checkbox"]').change(function() {
      let amenityId = $(this).data('name');
      if ($(this).is(':checked')) {
        amenities[amenityId] = true;
      } else {
        delete amenities[amenityId];
      }
      let amenitiesList = '';
      
      for (let id in amenities) {
        if (amenitiesList === '') amenitiesList += id;
        else amenitiesList += ', ' +  id  ;
      }
      $('div.amenities h4').text(amenitiesList);
    });
  });
