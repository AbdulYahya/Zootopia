// function getCurrentTimeStamp() {
//   let cTimestampDate = new Date();
//   let cTimestampToday = cTimestampDate.getDate();
//   let cTimestampMonth = cTimestampDate.getMonth() + 1; // 0 based value (0-11)
//   let cTimestampTime = cTimestampDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
//
//   setInterval(() => {
//     cTimestampToday = cTimestampDate.getDate();
//     cTimestampMonth = cTimestampDate.getMonth() + 1; // 0 based value (0-11)
//     cTimestampTime = cTimestampDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
//
//   }, 1000);
//
//   switch(cTimestampDate) {
//     case (cTimestampToday < 10):
//       cTimestampToday = `0${cTimestampToday}`;
//       break;
//     case (cTimestampMonth < 10):
//       cTimestampMonth = `0${cTimestampMonth}`;
//       break;
//     default:
//       break;
//   };
//
//   return `${cTimestampMonth}/${cTimestampToday} ${cTimestampTime}`;
// };
//
// $(function() {
//   $('#editBtn').click(function() {
//     console.log(`Edit Button clicked! ${getCurrentTimeStamp()}`);
//     $('#currentTimestamp').html(getCurrentTimeStamp());
//   });
//
//   $('#testing').click(function() {
//     alert('it works!');
//   });
//   // $('#currentTimestamp').html(getCurrentTimeStamp());
//
//   // Update the timestamp every 45 seconds
//   setInterval(() => {
//     $('#currentTimestamp').html(getCurrentTimeStamp());
//   }, 45000);
// });
