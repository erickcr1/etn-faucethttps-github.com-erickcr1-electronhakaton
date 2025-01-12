export function getTimeDiffAndPrettyText(futureDate: Date) {
  type Result = {
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    duration?: string,
    pretty?: string
  }
  const oResult: Result = {};
  const oToday = new Date();
  let nDiff = futureDate.getTime() - oToday.getTime();

  // Get diff in days
  oResult.days = Math.floor(nDiff / 1000 / 60 / 60 / 24);
  nDiff -= oResult.days * 1000 * 60 * 60 * 24;

  // Get diff in hours
  oResult.hours = Math.floor(nDiff / 1000 / 60 / 60);
  nDiff -= oResult.hours * 1000 * 60 * 60;

  // Get diff in minutes
  oResult.minutes = Math.floor(nDiff / 1000 / 60);
  nDiff -= oResult.minutes * 1000 * 60;

  // Get diff in seconds
  oResult.seconds = Math.floor(nDiff / 1000);

  // Render the diffs into friendly duration string

  // Days
  let sDays = '00';
  if (oResult.days > 0) {
    sDays = String(oResult.days);
  }
  if (sDays.length === 1) {
    sDays = '0' + sDays;
  }

  // Format Hours
  let sHour = '00';
  if (oResult.hours > 0) {
    sHour = String(oResult.hours);
  }
  if (sHour.length === 1) {
    sHour = '0' + sHour;
  }

  //  Format Minutes
  let sMins = '00';
  if (oResult.minutes > 0) {
    sMins = String(oResult.minutes);
  }
  if (sMins.length === 1) {
    sMins = '0' + sMins;
  }

  //  Format Seconds
  let sSecs = '00';
  if (oResult.seconds > 0) {
    sSecs = String(oResult.seconds);
  }
  if (sSecs.length === 1) {
    sSecs = '0' + sSecs;
  }

  //  Set Duration
  const sDuration = sDays + ':' + sHour + ':' + sMins + ':' + sSecs;
  oResult.duration = sDuration;

  // Set friendly text for printing
  if (oResult.days === 0) {

    if (oResult.hours === 0) {

      if (oResult.minutes === 0) {
        const sSecHolder = oResult.seconds > 1 ? 'seconds' : 'second';
        oResult.pretty = oResult.seconds + ' ' + sSecHolder;
      } else {
        const sMinutesHolder = oResult.minutes > 1 ? 'minutes' : 'minute';
        oResult.pretty = oResult.minutes + ' ' + sMinutesHolder;
      }

    } else {
      const sHourHolder = oResult.hours > 1 ? 'hours' : 'hour';
      oResult.pretty = oResult.hours + ' ' + sHourHolder;
    }
  } else {
    const sDayHolder = oResult.days > 1 ? 'days' : 'day';
    oResult.pretty = oResult.days + ' ' + sDayHolder;
  }

  return oResult.pretty;
}
