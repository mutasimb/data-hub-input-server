const
  { timeParse, utcFormat, utcParse } = require("d3-time-format"),
  { timeHour } = require("d3-time");

module.exports = data => {
  const
    receivedData = JSON.parse(Object.keys(data)[0]),
    {
      weatherStation: st,
      dataRecordUTC,
      end,
      dataCollector: user,

      minimumTemp: tmin,
      maximumTemp: tmax,
      Temp: t,
      measuredRainfall: pcp,
      Humidity: rh
    } = receivedData,

    utc = +dataRecordUTC.slice(0, 2),
    submit = timeParse("%Y-%m-%dT%H:%M:%S.%L")(end.slice(0, 23)),
    timestepApprox = [...(new Array(24))]
      .map((_, i) => timeHour.offset(submit, 2 - i))
      .find(el => +utcFormat("%H")(el) === utc),
    tm = utcParse("%Y-%m-%dT%H:%M:%S")(
      utcFormat("%Y-%m-%dT%H:00:00")(timestepApprox)
    );

  return { st, tm, submit, user, t: +t, tmx: tmax ? +tmax : null, tmn: tmin ? +tmin : null, p: pcp ? +pcp : 0, rh: +rh }
}
