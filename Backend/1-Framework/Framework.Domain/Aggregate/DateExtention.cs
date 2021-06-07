using System;
using System.Globalization;

namespace Framework.Domain.Aggregate
{
    public static class DateExtention
    {
        public static string ToHourMin(this double val)
        {
            if (val <= 0)
            {
                return "0";
            }
            return Math.Floor(val / 60) + ":" + val % 60;
        }
        /// <summary>
        /// in catch return DateTime.MinValue
        /// </summary>
        /// <param name="date"></param>
        /// <returns>Gregorian Date</returns>
        public static DateTime ToGregorianDate(this string date)
        {
            PersianCalendar persianCalendar = new PersianCalendar();

            if (string.IsNullOrWhiteSpace(date)) return DateTime.MinValue;
            date = date.Replace("-", "/");
            if (date == "") return DateTime.Now;
            try
            {
                string[] ymd = date.Split('/');
                int y = Convert.ToInt32(ymd[0]);
                int m = Convert.ToInt32(ymd[1]);
                int d = Convert.ToInt32(ymd[2]);
                if (ymd[2].Length == 4)
                {
                    y = Convert.ToInt32(ymd[2]);
                    d = Convert.ToInt32(ymd[0]);
                }

                return persianCalendar.ToDateTime(y, m, d, 0, 0, 0, 0);
            }
            catch
            {
                return DateTime.MinValue;
            }
        }
        public static string ToPersianDate(this DateTime date, string separator )
        {
            PersianCalendar persianCalendar = new PersianCalendar();

            try
            {
                DateTime dt = new DateTime(date.Year, date.Month, date.Day);
                return (persianCalendar.GetYear(dt)
                        + separator +
                        persianCalendar.GetMonth(dt).ToString().PadLeft(2, '0')
                        + separator +
                        persianCalendar.GetDayOfMonth(dt)).ToString().PadLeft(2, '0');
            }
            catch
            {
                return string.Empty;
            }
        }
        public static int GetPersianDay(this DateTime date)
        {
            try
            {
                PersianCalendar persianCalendar = new PersianCalendar();
                return persianCalendar.GetDayOfMonth(date);
            }
            catch
            {
                return 0;
            }

        }

        public static int GetPersianYear(this DateTime date)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            return persianCalendar.GetYear(date);
        }

        public static Tuple<int, DayOfWeek> GetDaysInMonthAndFirstDayOfWeek(int year, int month)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            return new Tuple<int, DayOfWeek>(persianCalendar.GetDaysInMonth(year, month), persianCalendar.ToDateTime(year, month, 1, 0, 0, 0, 0).DayOfWeek);
        }
        public static Tuple<DateTime, DateTime> ToGregorianDateByYearAndMonth(int year, int month)
        {
            PersianCalendar persianCalendar = new PersianCalendar();
            DateTime from = persianCalendar.ToDateTime(year, month, 1, 0, 0, 0, 0);
            DateTime to = persianCalendar.ToDateTime(year, month, persianCalendar.GetDaysInMonth(year, month), 0, 0, 0, 0);
            return new Tuple<DateTime, DateTime>(from, to.ToMaxDateTime());
        }
        public static string ToPersianDateTime(this DateTime date, string separator = "/")
        {
            PersianCalendar persianCalendar = new PersianCalendar();

            try
            {
                DateTime dt = new DateTime(date.Year, date.Month, date.Day);
                return (persianCalendar.GetYear(dt)
                        + separator +
                         persianCalendar.GetMonth(dt).ToString().PadLeft(2, '0')
                        + separator +
                        persianCalendar.GetDayOfMonth(dt).ToString().PadLeft(2, '0')
                        + " - "
                        + $"{date.Hour.ToString().PadLeft(2, '0')}:{date.Minute.ToString().PadLeft(2, '0')}:{date.Second.ToString().PadLeft(2, '0')}"
                        );
            }
            catch
            {
                return string.Empty;
            }
        }
        public static DateTime? ToMaxDateTime(this DateTime? date)
        {
            if (!date.HasValue)
                return null;

            return new DateTime(date.Value.Year, date.Value.Month, date.Value.Day, 23, 59, 59);
        }

        public static DateTime ToMaxDateTime(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 23, 59, 59);
        }
        public static DateTime GetDateTime(this DateTime? date, string time)
        {
            if (date == null)
                return DateTime.Now;
            var hour = DateTime.Now.Hour;
            var minute = DateTime.Now.Minute;
            if (!string.IsNullOrEmpty(time))
            {
                try
                {
                    hour = int.Parse(time.Split(':')[0]);
                    minute = int.Parse(time.Split(':')[1]);
                }
                catch (Exception)
                {
                }
            }
            return new DateTime(date.Value.Year, date.Value.Month, date.Value.Day, hour, minute, 0);

        }

        public static DateTime? ToMinDateTime(this DateTime? date)
        {
            if (!date.HasValue)
                return null;

            return new DateTime(date.Value.Year, date.Value.Month, date.Value.Day, 0, 0, 0);
        }

        public static DateTime ToMinDateTime(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
        }
        public static long ToPersianTime(this DateTime dateTime)
        {
            var time = dateTime.TimeOfDay;
            return time.Hours*10000000 + time.Minutes*100000 + time.Seconds*1000 + time.Milliseconds;
        }


        public static long ToPersianDate(this DateTime dateTime)
        {
            var p = new System.Globalization.PersianCalendar();
            var year = p.GetYear(dateTime);
            var month = p.GetMonth(dateTime);
            var day = p.GetDayOfMonth(dateTime);
            return year * 10000 + month * 100 + day;
        }


        public static string ToPersianDateFormat(this int persianDate)
        {
            return string.Format("{0:0000}/{1:00}/{2:00}", persianDate / 10000, ((persianDate % 10000) / 100), persianDate % 100);
        }

        public static string ToPersianDateFormat(this int? persianDate)
        {
            return string.Format("{0:0000}/{1:00}/{2:00}", persianDate / 10000, ((persianDate % 10000) / 100), persianDate % 100);
        }

        public static string ToPersianTimeFormat(this int persianTime)
        {
            return string.Format("{0:00}:{1:00}:{2:00}", persianTime / 10000, (persianTime / 100) % 100, persianTime % 100);
        }

        public static string ToPersianTimeFormat(this int? persianTime)
        {
            return string.Format("{0:00}:{1:00}:{2:00}", persianTime / 10000, (persianTime / 100) % 100, persianTime % 100);
        }
    }
}