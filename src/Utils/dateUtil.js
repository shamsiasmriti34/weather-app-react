export function getLocalTime(timezone,now){
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,     
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true           
      }).format(now);
}

export function getLocalDay(timezone,now){
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long'
      }).format(now);

}