import anime from 'animejs/lib/anime.es.js';

const container = document.querySelector('.tags-list');
const tags = document.querySelectorAll('.tags-item');

function moveTags() {
  tags.forEach(tag => {
    const dx = (Math.random() - 0.5) * 2 * 50;
    const dy = (Math.random() - 0.5) * 2 * 50;
    const rotation = (Math.random() - 0.5) * 2 * 360;

    const tagX = tag.offsetLeft + tag.clientWidth / 2;
    const tagY = tag.offsetTop + tag.clientHeight / 2;

    const x = tagX + dx;
    const y = tagY + dy;

    const maxX = container.clientWidth - tag.clientWidth;
    const maxY = container.clientHeight - tag.clientHeight;

    const constrainedX = Math.min(
      Math.max(x, tag.clientWidth / 2),
      maxX + tag.clientWidth / 2
    );
    const constrainedY = Math.min(
      Math.max(y, tag.clientHeight / 2),
      maxY + tag.clientHeight / 2
    );

    anime({
      targets: tag,
      translateX: constrainedX - tagX,
      translateY: constrainedY - tagY,
      rotate: rotation,
      duration: 3000,
      easing: 'linear',
      complete: () => {
        moveTag(tag); // Call moveTag again for the same tag
      },
    });
  });
}

function moveTag(tag) {
  const dx = (Math.random() - 0.5) * 2 * 50;
  const dy = (Math.random() - 0.5) * 2 * 50;
  const rotation = (Math.random() - 0.5) * 2 * 360;

  const tagX = tag.offsetLeft + tag.clientWidth / 2;
  const tagY = tag.offsetTop + tag.clientHeight / 2;

  const x = tagX + dx;
  const y = tagY + dy;

  const maxX = container.clientWidth - tag.clientWidth;
  const maxY = container.clientHeight - tag.clientHeight;

  const constrainedX = Math.min(
    Math.max(x, tag.clientWidth / 2),
    maxX + tag.clientWidth / 2
  );
  const constrainedY = Math.min(
    Math.max(y, tag.clientHeight / 2),
    maxY + tag.clientHeight / 2
  );

  anime({
    targets: tag,
    translateX: constrainedX - tagX,
    translateY: constrainedY - tagY,
    rotate: rotation,
    duration: 50000,
    easing: 'linear',
    complete: () => {
      moveTag(tag);
    },
  });
}

tags.forEach(tag => {
  moveTag(tag);
});
