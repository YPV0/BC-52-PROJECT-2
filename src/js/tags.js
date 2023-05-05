// import anime from 'animejs/lib/anime.es.js';

// const container = document.querySelector('.tags-list');
// const tags = document.querySelectorAll('.tags-item');

// const tagData = Array.from(tags).map(tag => {
//   const x = tag.offsetLeft + tag.clientWidth / 2;
//   const y = tag.offsetTop + tag.clientHeight / 2;
//   return {
//     element: tag,
//     x,
//     y,
//     maxX: container.clientWidth - tag.clientWidth,
//     maxY: container.clientHeight - tag.clientHeight,
//     rotation: 0,
//   };
// });

// function moveTags() {
//   tagData.forEach(tag => {
//     const dx = (Math.random() - 0.5) * 2 * 110;
//     const dy = (Math.random() - 0.5) * 2 * 110;
//     const rotation = (Math.random() - 0.5) * 2 * 360;

//     const x = tag.x + dx;
//     const y = tag.y + dy;

//     const constrainedX = Math.min(
//       Math.max(x, tag.element.clientWidth / 2),
//       tag.maxX + tag.element.clientWidth / 2
//     );
//     const constrainedY = Math.min(
//       Math.max(y, tag.element.clientHeight / 2),
//       tag.maxY + tag.element.clientHeight / 2
//     );

//     tag.x = constrainedX;
//     tag.y = constrainedY;
//     tag.rotation = rotation;

//     anime({
//       targets: tag.element,
//       translateX:
//         constrainedX - tag.element.offsetLeft - tag.element.clientWidth / 2,
//       translateY:
//         constrainedY - tag.element.offsetTop - tag.element.clientHeight / 2,
//       rotate: rotation,
//       duration: 3000,
//       easing: 'linear',
//       complete: () => {
//         moveTag(tag); // Call moveTag again for the same tag
//       },
//     });
//   });
// }

// function moveTag(tag) {
//   const dx = (Math.random() - 0.5) * 2 * 110;
//   const dy = (Math.random() - 0.5) * 2 * 110;
//   const rotation = (Math.random() - 0.5) * 2 * 360;

//   const x = tag.x + dx;
//   const y = tag.y + dy;

//   const constrainedX = Math.min(
//     Math.max(x, tag.element.clientWidth / 2),
//     tag.maxX + tag.element.clientWidth / 2
//   );
//   const constrainedY = Math.min(
//     Math.max(y, tag.element.clientHeight / 2),
//     tag.maxY + tag.element.clientHeight / 2
//   );

//   tag.x = constrainedX;
//   tag.y = constrainedY;
//   tag.rotation = rotation;

//   anime({
//     targets: tag.element,
//     translateX:
//       constrainedX - tag.element.offsetLeft - tag.element.clientWidth / 2,
//     translateY:
//       constrainedY - tag.element.offsetTop - tag.element.clientHeight / 2,
//     rotate: rotation,
//     duration: 20000,
//     easing: 'linear',
//     complete: () => {
//       moveTag(tag);
//     },
//   });
// }

// tagData.forEach(tag => {
//   moveTag(tag);
// });
