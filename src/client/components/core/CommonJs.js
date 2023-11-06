const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const range = (start, end) => {
  return Array.apply(0, Array(end - start + 1)).map((element, index) => index + start);
};

const getId = (arr, suffix = '', keyId = 'id') => {
  if (!Array.isArray(arr) && typeof arr === 'object')
    arr = Object.keys(arr).map((id) => {
      const idElement = {};
      idElement[keyId] = id;
      return idElement;
    });
  let _id;
  while (arr.find((element) => element[keyId] === _id) || !_id)
    _id = suffix + (s4() + s4() + s4() + s4() + s4()).slice(1);
  return _id;
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive

const randomHexColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

const getRawCsvFromArray = (array) =>
  array[0]
    ? Object.keys(array[0]).join(';') +
      '\r\n' +
      array
        .map((x) => {
          return (
            Object.keys(x)
              .map((attr) => x[attr])
              .join(';') + '\r\n'
          );
        })
        .join('')
    : '';

const newInstance = (obj) => JSON.parse(JSON.stringify(obj));

const cap = (str) =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const capFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const uniqueArray = (arr) => arr.filter((item, pos) => arr.indexOf(item) == pos);

const orderArrayFromAttrInt = (arr, attr, type) =>
  // type -> true asc
  // type -> false desc
  type === 'asc' ? arr.sort((a, b) => a[attr] - b[attr]) : arr.sort((a, b) => b[attr] - a[attr]);

const getRandomPoint = (suffix, pointsArray) => {
  const point = pointsArray[random(0, pointsArray.length - 1)];
  const returnPoint = {};
  returnPoint['x' + suffix] = point[0];
  returnPoint['y' + suffix] = point[1];
  return returnPoint;
};

const getYouTubeID = (url) => {
  const p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) return url.match(p)[1];
  return false;
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const reOrderIntArray = (array) => {
  /* shuffle */
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const orderAbc = (arr, attr) =>
  arr.sort((a, b) => {
    if (attr) {
      if (a[attr] < b[attr]) {
        return -1;
      }
      if (a[attr] > b[attr]) {
        return 1;
      }
    } else {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
    }
    return 0;
  });

const getDirection = (x1, y1, x2, y2) => {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  //Check for all the 8 directions that a point can move
  let direction, arrow, htmlArrow;

  if (deltaX > 0 && deltaY > 0) direction = 'South East';
  else if (deltaX > 0 && deltaY === 0) direction = 'East';
  else if (deltaX > 0 && deltaY < 0) direction = 'North East';
  else if (deltaX === 0 && deltaY > 0) direction = 'South';
  else if (deltaX === 0 && deltaY < 0) direction = 'North';
  else if (deltaX < 0 && deltaY > 0) direction = 'South West';
  else if (deltaX < 0 && deltaY === 0) direction = 'West';
  else if (deltaX < 0 && deltaY < 0) direction = 'North West';

  switch (direction) {
    case 'South East':
      arrow = '↘';
      htmlArrow = '&#8600;';
      break;
    case 'East':
      arrow = '→';
      htmlArrow = '&#8594;';
      break;
    case 'North East':
      arrow = '↗';
      htmlArrow = '&#8599;';
      break;
    case 'South':
      arrow = '↓';
      htmlArrow = '&#8595;';
      break;
    case 'North':
      arrow = '↑';
      htmlArrow = '&#8593;';
      break;
    case 'South West':
      arrow = '↙';
      htmlArrow = '&#8601;';
      break;
    case 'West':
      arrow = '←';
      htmlArrow = '&#8592;';
      break;
    case 'North West':
      arrow = '↖';
      htmlArrow = '&#8598;';
      break;
  }
  return {
    direction,
    arrow,
    htmlArrow,
  };
};

// get joystick direction from eight direction
// through  x1,y1, to x2, y2 cartesian coordinate in javascript

function getJoystickDirection(x1, y1, x2, y2) {
  // Calculate the angle in radians
  const angle = Math.atan2(y2 - y1, x2 - x1);

  // Convert the angle to degrees
  let degrees = angle * (180 / Math.PI);

  // Adjust the angle to be positive
  if (degrees < 0) {
    degrees += 360;
  }

  // Map the angle to one of the eight directions
  let direction;
  if (degrees >= 337.5 || degrees < 22.5) {
    direction = 'right';
    // direction = 'East';
  } else if (degrees >= 22.5 && degrees < 67.5) {
    direction = 'down-right';
    // direction = 'South East';
  } else if (degrees >= 67.5 && degrees < 112.5) {
    direction = 'down';
    // direction = 'South';
  } else if (degrees >= 112.5 && degrees < 157.5) {
    direction = 'down-left';
    // direction = 'South West';
  } else if (degrees >= 157.5 && degrees < 202.5) {
    direction = 'left';
    // direction = 'West';
  } else if (degrees >= 202.5 && degrees < 247.5) {
    direction = 'up-left';
    // direction = 'North West';
  } else if (degrees >= 247.5 && degrees < 292.5) {
    direction = 'up';
    // direction = 'North';
  } else if (degrees >= 292.5 && degrees < 337.5) {
    direction = 'up-right';
    // direction = 'North East';
  }

  return direction;
}

const JSONmatrix = (matrix) =>
  `[\r\n${matrix.map((x, i) => `   ` + JSON.stringify(x) + (i === matrix.length - 1 ? '' : ',') + '\r\n').join('')}]`;

function merge(target) {
  for (let i = 1; i < arguments.length; ++i) {
    let from = arguments[i];
    if (typeof from !== 'object') continue;
    for (let j in from) {
      if (from.hasOwnProperty(j)) {
        target[j] = typeof from[j] === 'object' ? merge({}, target[j], from[j]) : from[j];
      }
    }
  }
  return target;
}

const getDistance = (x1, y1, x2, y2) => {
  const disX = Math.abs(x2 - x1);
  const disY = Math.abs(y2 - y1);
  return Math.sqrt(disX * disX + disY * disY);
};

/**
 * Decimal setting of a number.
 *
 * @param {String} type The type of setting.
 * @param {Number} value The number.
 * @param {Integer} exp The exponent (the log 10 of the base fit).
 * @returns {Number} The adjusted value.
 */
const decimalAdjust = (type, value, exp) => {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/round
};

const floatFixed = (v, d) => parseFloat(v).toFixed(d);

// Decimal round

const round10 = (value, exp) => {
  return decimalAdjust('round', value, exp);
};

// Decimal floor

const floor10 = (value, exp) => {
  return decimalAdjust('floor', value, exp);
};

// Decimal ceil

const ceil10 = (value, exp) => {
  return decimalAdjust('ceil', value, exp);
};

// // Round
// round10(55.55, -1);   // 55.6
// round10(55.549, -1);  // 55.5
// round10(55, 1);       // 60
// round10(54.9, 1);     // 50
// round10(-55.55, -1);  // -55.5
// round10(-55.551, -1); // -55.6
// round10(-55, 1);      // -50
// round10(-55.1, 1);    // -60
// round10(1.005, -2);   // 1.01 -- compare this with round(1.005*100)/100 above
// // Floor
// floor10(55.59, -1);   // 55.5
// floor10(59, 1);       // 50
// floor10(-55.51, -1);  // -55.6
// floor10(-51, 1);      // -60
// // Ceil
// ceil10(55.51, -1);    // 55.6
// ceil10(51, 1);        // 60
// ceil10(-55.59, -1);   // -55.5
// ceil10(-59, 1);       // -50

function objectEquals(x, y) {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every((key) => objectEquals(x[key], y[key]))
    : x === y;
}

function insertTransitionCoordinates(coordinates, transitionFactor) {
  // Create a new array to store the resulting coordinates
  const coordinatesWithTransition = [];

  // Iterate over the coordinates array
  for (let i = 0; i < coordinates.length - 1; i++) {
    const [x1, y1] = coordinates[i];
    const [x2, y2] = coordinates[i + 1];

    // Add the initial integer coordinate to the new array
    coordinatesWithTransition.push([x1, y1]);

    // Calculate the increments for each coordinate
    const incrementX = (x2 - x1) / transitionFactor;
    const incrementY = (y2 - y1) / transitionFactor;

    // Add the intermediate coordinates
    for (let j = 1; j <= transitionFactor - 1; j++) {
      const xIntermediate = x1 + incrementX * j;
      const yIntermediate = y1 + incrementY * j;
      coordinatesWithTransition.push([xIntermediate, yIntermediate]);
    }
  }

  // Add the last integer coordinate to the new array
  coordinatesWithTransition.push(coordinates[coordinates.length - 1]);

  // Now, coordinatesWithTransition contains the coordinates with transition
  return coordinatesWithTransition;
}

const getIsoDate = (date) => date.toISOString().slice(0, -5).replace('T', ' ');

const clearTerminalStringColor = (str) => str.replace(/\x1b\[[0-9;]*m/g, '');

const getIdModule = (meta) => meta.url.split(`/`).pop();

export {
  s4,
  range,
  random,
  newInstance,
  cap,
  uniqueArray,
  orderArrayFromAttrInt,
  getYouTubeID,
  timer,
  getRawCsvFromArray,
  reOrderIntArray,
  capFirst,
  orderAbc,
  getDirection,
  getDistance,
  decimalAdjust,
  round10,
  floor10,
  ceil10,
  JSONmatrix,
  getRandomPoint,
  merge,
  objectEquals,
  getJoystickDirection,
  floatFixed,
  getId,
  insertTransitionCoordinates,
  randomHexColor,
  getIdModule,
  clearTerminalStringColor,
  getIsoDate,
};
