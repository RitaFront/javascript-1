const url = 'https://purplescool.ru/course/javascript';

function separation(url) {
  const [protocol, _, host, ...path] = url.split('/');
  if (protocol === 'https:' || protocol === 'http:') {
    if (!host.includes('.')) {
      return;
    }
    console.log(protocol, _, host, path);
    console.log(`Протокол: ${protocol.split(':')[0]}`);
    console.log(`Доменное имя: ${host}`);
    console.log(`Путь внутри сайта: /${path.join('/')}`);
  }
}

separation(url);
