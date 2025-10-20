
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// START OF FILE: utils/multilingual.ts
const getMultilingualText = (
  textObj,
  currentLang,
  defaultLang
) => {
  if (!textObj) {
    return '';
  }
  if (typeof textObj === 'string') {
      return textObj;
  }
  if (textObj[currentLang]) {
    return textObj[currentLang];
  }
  if (textObj[defaultLang]) {
    return textObj[defaultLang];
  }
  const availableLangs = Object.keys(textObj);
  if (availableLangs.length > 0) {
      const firstLang = availableLangs[0];
      return textObj[firstLang] || '';
  }

  return '';
};

// START OF FILE: constants.ts
const SECTIONS_CONFIG = [
  { key: 'biography', icon: 'fa-book-open', title: { vi: 'Tiểu Sử', en: 'Biography' } },
  { key: 'massReadings', icon: 'fa-cross', title: { vi: 'Thánh Lễ', en: 'Mass Readings' } },
  { key: 'officeOfReadings', icon: 'fa-book-bible', title: { vi: 'Kinh Sách', en: 'Office of Readings' } },
  { key: 'lauds', icon: 'fa-sun', title: { vi: 'Kinh Sáng', en: 'Lauds' } },
  { key: 'middayPrayer', icon: 'fa-clock', title: { vi: 'Kinh Trưa', en: 'Midday Prayer' } },
  { key: 'vespers', icon: 'fa-moon', title: { vi: 'Kinh Chiều', en: 'Vespers' } },
  //{ key: 'compline', icon: 'fa-bed', title: { vi: 'Kinh Tối', en: 'Compline' } },
];


// START OF FILE: data.ts
const placeholder = {
  vi: `<p class="text-center text-gray-400 italic">Nội dung cho phần này đang được cập nhật...</p>`,
  en: `<p class="text-center text-gray-400 italic">Content for this section is being updated...</p>`,
  // es: `<p class="text-center text-gray-400 italic">El contenido de esta sección se está actualizando...</p>`,
  // fr: `<p class="text-center text-gray-400 italic">Le contenu de cette section est en cours de mise à jour...</p>`,
  // la: `<p class="text-center text-gray-400 italic">Contentus huius sectionis renovatur...</p>`,
};
const FEASTS = [
  {
    id: 'st-elizabeth-ann-seton',
    date: '01-04',
    title: { 
      vi: 'Thánh Nữ Ê-li-za-bét An-na Xe-tôn',
      en: 'St. Elizabeth Ann Seton',
      // es: 'Santa Isabel Ana Seton',
      // fr: 'Sainte Élisabeth-Ann Seton',
      // la: 'Sancta Elisabeth Anna Seton'
    },
    subtitle: {
      vi: 'Nữ tu',
      en: 'Religious',
      // es: 'Religiosa',
      // fr: 'Religieuse',
      // la: 'Religiosa'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
Elizabeth Ann Baley sinh ở New York ngày 28 tháng 8 năm 1774, khi sắp xảy ra các biến cố đưa Hợp chủng quốc Hoa Kỳ đến nền Độc lập. Mồ côi mẹ lúc ba tuổi, cô bé lớn lên trong một gia đình được đánh dấu bởi sự tục huyền của cha cô và việc gia đình thuộc Giáo Hội Tân giáo.
Thánh nữ kết hôn với William Seton lúc 20 tuổi, và từ cuộc hôn nhân này, bà có năm người con. Trong một chuyến đi công tác đến Ý, chồng bà qua đời ở Pise ngày 27 tháng 12 năm 1803. Bà được một gia đình thân tình công giáo đón tiếp và an ủi: đó là gia đình Felicchi mà bà phát hiện có lòng bác ái sâu xa.
Trở về Hoa Kỳ, Elizabeth, là tín đồ Tân giáo sùng đạo, giờ đây lại cảm thấy bị giáo thuyết Công giáo thu hút mạnh mẽ. Gia đình bà, vì không hiểu sự tìm hiểu nghiên cứu này của bà, nên ruồng bỏ bà. Khi đó, Elizabeth đương đầu với rất nhiều thử thách cá nhân cũng như gia đình. Cuối cùng, đến ngày 14 tháng 3 năm 1805, bà được tiếp nhận vào Giáo Hội Công Giáo.
Trong khi vẫn có một cuộc sống thiêng liêng mãnh liệt và thường xuyên chăm lo giáo dục con cái, bà vẫn theo đuổi sở thích riêng là được dấn thân trọn vẹn cho các công việc bác ái. Đến năm 1809, bà sáng lập Hội Dòng các Nữ tu Bác ái, ở giáo phận Baltimore, nhận thánh Giuse làm quan thầy, để giáo dục các thiếu nữ. Theo sự hướng dẫn của Đức Cha Cheverus, bà muốn được sát nhập với Tu Hội Nữ Tử Bác Ái thánh Vinh Sơn Phaolô, thế nhưng tình hình chính trị lúc bấy giờ cản trở kế hoạch này. Đến ngày 4 tháng 01 năm 1821, Ê-li-za-bét An-na Xe-tôn qua đời ở Emmitsburg. Bà cũng là người làm phát sinh ra năm nhánh các nữ tu Hoa Kỳ hoạt động bác ái. Nhánh ở Emmitsburg sẽ hợp nhất với Tu Hội Nữ Tử Bác Ái vào ngày 25 tháng 3 năm 1850.
Được Lời Chúa rèn luyện, cùng với một tình yêu cuồng nhiệt đối với Giáo Hội, Ê-li-za-bét An-na Xe-tôn để lại một tư tưởng vững chắc. Ngài được Đức Giáo Hoàng Gioan XXIII tuyên phong chân phước ngày 17 tháng 3 năm 1963, và được Đức Phaolô VI tôn phong hiển thánh ngày 14 tháng 9 năm 1975.`,
        en: `<strong>Biography</strong>
Elizabeth Ann Bayley was born in New York on August 28, 1774, on the eve of the events that would lead the United States of America to its Independence. Orphaned of her mother at the age of three, she grew up in a family marked by her father's remarriage and their membership in the Episcopal Church.
She married William Seton at the age of 20, and from this marriage, she had five children. During a business trip to Italy, her husband died in Pisa on December 27, 1803. She was welcomed and comforted by a friendly Catholic family: the Felicchi family, in whom she discovered profound charity.
Upon her return to the United States, Elizabeth, a devout Episcopalian, now felt strongly attracted to Catholic doctrine. Her family, not understanding her quest, abandoned her. Elizabeth then faced many personal and family trials. Finally, on March 14, 1805, she was received into the Catholic Church.
While maintaining an intense spiritual life and regularly caring for the education of her children, she pursued her own interest in being fully committed to charitable works. In 1809, she founded the Congregation of the Sisters of Charity in the diocese of Baltimore, with St. Joseph as its patron, for the education of young girls. Under the guidance of Bishop Cheverus, she wished to be affiliated with the Company of the Daughters of Charity of St. Vincent de Paul, but the political situation at the time prevented this plan. On January 4, 1821, Elizabeth Ann Seton died in Emmitsburg. She was also the originator of five branches of American Sisters of Charity. The Emmitsburg branch would merge with the Company of the Daughters of Charity on March 25, 1850.
Formed by the Word of God, with a fervent love for the Church, Elizabeth Ann Seton left a solid legacy of thought. She was beatified by Pope John XXIII on March 17, 1963, and canonized by Pope Paul VI on September 14, 1975.`,
//         es: `<strong>Biografía</strong>
// Elizabeth Ann Bayley nació en Nueva York el 28 de agosto de 1774, en vísperas de los acontecimientos que llevarían a los Estados Unidos de América a su Independencia. Huérfana de madre a los tres años, creció en una familia marcada por el segundo matrimonio de su padre y su pertenencia a la Iglesia Episcopal.
// Se casó con William Seton a los 20 años, y de este matrimonio tuvo cinco hijos. Durante un viaje de negocios a Italia, su esposo murió en Pisa el 27 de diciembre de 1803. Fue acogida y consolada por una amigable familia católica: la familia Felicchi, en la que descubrió una profunda caridad.
// A su regreso a los Estados Unidos, Elizabeth, una devota episcopaliana, se sintió fuertemente atraída por la doctrina católica. Su familia, al no comprender su búsqueda, la abandonó. Elizabeth enfrentó entonces muchas pruebas personales y familiares. Finalmente, el 14 de marzo de 1805, fue recibida en la Iglesia Católica.
// Mientras mantenía una intensa vida espiritual y cuidaba regularmente la educación de sus hijos, persiguió su propio interés de comprometerse plenamente con las obras de caridad. En 1809, fundó la Congregación de las Hermanas de la Caridad en la diócesis de Baltimore, con San José como patrón, para la educación de las jóvenes. Bajo la guía del obispo Cheverus, deseaba afiliarse a la Compañía de las Hijas de la Caridad de San Vicente de Paúl, pero la situación política de la época impidió este plan. El 4 de enero de 1821, Elizabeth Ann Seton murió en Emmitsburg. También fue la fundadora de cinco ramas de Hermanas de la Caridad americanas. La rama de Emmitsburg se fusionaría con la Compañía de las Hijas de la Caridad el 25 de marzo de 1850.
// Formada por la Palabra de Dios, con un ferviente amor por la Iglesia, Elizabeth Ann Seton dejó un sólido legado de pensamiento. Fue beatificada por el Papa Juan XXIII el 17 de marzo de 1963 y canonizada por el Papa Pablo VI el 14 de septiembre de 1975.`,
//         fr: `<strong>Biographie</strong>
// Elizabeth Ann Bayley est née à New York le 28 août 1774, à la veille des événements qui allaient conduire les États-Unis d'Amérique à leur indépendance. Orpheline de sa mère à l'âge de trois ans, elle a grandi dans une famille marquée par le remariage de son père et leur appartenance à l'Église épiscopalienne.
// Elle a épousé William Seton à l'âge de 20 ans, et de ce mariage, elle a eu cinq enfants. Lors d'un voyage d'affaires en Italie, son mari est décédé à Pise le 27 décembre 1803. Elle a été accueillie et réconfortée par une famille catholique amie : la famille Felicchi, chez qui elle a découvert une profonde charité.
// À son retour aux États-Unis, Elizabeth, une fervente épiscopalienne, se sentit fortement attirée par la doctrine catholique. Sa famille, ne comprenant pas sa quête, l'abandonna. Elizabeth a alors dû faire face à de nombreuses épreuves personnelles et familiales. Finalement, le 14 mars 1805, elle fut reçue dans l'Église catholique.
// Tout en menant une vie spirituelle intense et en s'occupant régulièrement de l'éducation de ses enfants, elle a poursuivi son propre intérêt à s'engager pleinement dans les œuvres de charité. En 1809, elle a fondé la Congrégation des Sœurs de la Charité dans le diocèse de Baltimore, avec saint Joseph comme patron, pour l'éducation des jeunes filles. Sous la direction de Mgr Cheverus, elle souhaitait être affiliée à la Compagnie des Filles de la Charité de saint Vincent de Paul, mais la situation politique de l'époque a empêché ce projet. Le 4 janvier 1821, Elizabeth Ann Seton est décédée à Emmitsburg. Elle est également à l'origine de cinq branches de Sœurs de la Charité américaines. La branche d'Emmitsburg fusionnera avec la Compagnie des Filles de la Charité le 25 mars 1850.
// Formée par la Parole de Dieu, avec un amour fervent pour l'Église, Elizabeth Ann Seton a laissé un solide héritage de pensée. Elle a été béatifiée par le pape Jean XXIII le 17 mars 1963 et canonisée par le pape Paul VI le 14 septembre 1975.`,
//         la: `<strong>Vita</strong>
// Elisabeth Anna Bayley nata est Novi Eboraci die 28 Augusti 1774, pridie eventuum qui Civitates Foederatas Americae ad libertatem ducerent. Matre orbata tres annos nata, in familia crevit patris secundis nuptiis et adhaesione ad Ecclesiam Episcopalem notata.
// Gulielmo Seton nupsit viginti annos nata, et ex hoc matrimonio quinque filios habuit. In itinere negotiatorio in Italiam, maritus eius Pisis obiit die 27 Decembris 1803. A familia catholica amica excepta et consolata est: familia Felicchi, in qua profundam caritatem invenit.
// In Civitates Foederatas reversa, Elisabeth, devota episcopaliana, nunc ad doctrinam catholicam vehementer attracta sensit. Familia eius, hanc quaestionem non intelligens, eam deseruit. Elisabeth tunc multis personalibus et familiaribus probationibus obviam ivit. Denique, die 14 Martii 1805, in Ecclesiam Catholicam recepta est.
// Dum vitam spiritualem intensam gerebat et filiorum educationi regulariter vacabat, proprium studium se plene operibus caritatis dedicandi secuta est. Anno 1809, Congregationem Sororum Caritatis in dioecesi Baltimorensi fundavit, Sancto Iosepho patrono, ad puellarum educationem. Sub ductu Episcopi Cheverus, cum Societate Filiarum Caritatis Sancti Vincentii a Paulo affiliari cupiebat, sed rerum politicarum condicio tunc temporis hoc consilium impedivit. Die 4 Ianuarii 1821, Elisabeth Anna Seton Emmitsburgi obiit. Fuit etiam origo quinque ramorum Sororum Caritatis Americanarum. Ramus Emmitsburgensis cum Societate Filiarum Caritatis die 25 Martii 1850 uniretur.
// Verbo Dei formata, ferventi amore erga Ecclesiam, Elisabeth Anna Seton solidum cogitationis legatum reliquit. A Papa Ioanne XXIII beatificata est die 17 Martii 1963, et a Papa Paulo VI canonizata die 14 Septembris 1975.`
    
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>
<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.
<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. Chúng con cầu xin.
<strong>Bài đọc (1 Ga 3, 14-18)</strong>
<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>
Anh em thân mến, chúng ta biết rằng: chúng ta đã từ cõi chết bước vào cõi sống, vì chúng ta yêu thương anh em. Kẻ không yêu thương, thì ở lại trong sự chết. Ai ghét anh em mình, ấy là kẻ sát nhân. Và anh em biết: không kẻ sát nhân nào có sự sống đời đời ở lại trong nó. Căn cứ vào điều này, chúng ta biết được tình yêu là gì: đó là Đức Kitô đã thí mạng vì chúng ta. Như vậy, cả chúng ta nữa, chúng ta cũng phải thí mạng vì anh em. Nếu ai có của cải thế gian và thấy anh em mình lâm cảnh túng thiếu, mà lại đóng cửa lòng lại, không thương xót, thì làm sao tình yêu của Thiên Chúa ở lại trong người ấy được? Hỡi anh em là những người con bé nhỏ, chúng ta đừng yêu thương nơi đầu môi chóp lưỡi, nhưng phải yêu thương cách chân thật và bằng việc làm.
<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con, vì bên Ngài con đang ẩn náu. Con thưa cùng Chúa: “Ngài là Chúa con thờ, ngoài Chúa ra đâu là hạnh phúc”. <strong>Đ.</strong>
Con chúc tụng Chúa hằng thương chỉ dạy, ngay cả đêm trường, lòng dạ nhắn nhủ con. Con luôn nhớ có Ngài trước mặt, được Ngài ở bên chẳng nao núng bao giờ. <strong>Đ.</strong>
Chúa sẽ dạy con biết đường về cõi sống, trước Thánh Nhan ôi vui sướng tràn trề, ở bên Ngài, hoan lạc chẳng hề vơi! <strong>Đ.</strong>
<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
Ha-lê-lu-i-a. Ha-lê-lu-i-a. Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. Ha-lê-lu-i-a.
<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>
Khi ấy, Đức Giêsu nói với các môn đệ rằng: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn. Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết. Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau””.
<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn. Chúng con cầu xin.
<strong>Ca hiệp lễ (Ga 8,12)</strong>
Đức Giê-su nói: “Tôi là ánh sáng thế gian. Ai theo tôi, sẽ không phải đi trong bóng tối, nhưng sẽ nhận được ánh sáng đem lại sự sống”.
<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý. Chúng con cầu xin.`,
        en: `<strong>MASS</strong>
<strong>Entrance Antiphon (Jer 17:7-8)</strong>
Blessed is the one who trusts in the Lord, whose hope is the Lord. He is like a tree planted beside the waters that stretches out its roots to the stream.
<strong>Collect</strong>
O God, who crowned with the gift of true faith your holy one Elizabeth Ann Seton, grant us, we pray, that, by her example and intercession, we may grow in love for you and devote ourselves with zeal to the service of those in need. Through our Lord Jesus Christ, your Son.
<strong>Reading (1 Jn 3:14-18)</strong>
<em>A reading from the first Letter of Saint John.</em>
Beloved, we know that we have passed from death to life, because we love our brothers. Whoever does not love remains in death. Everyone who hates his brother is a murderer, and you know that no murderer has eternal life remaining in him. The way we came to know love was that he laid down his life for us; so we ought to lay down our lives for our brothers. If someone who has worldly means sees a brother in need and refuses him compassion, how can the love of God remain in him? Children, let us not love in word or speech but in deed and truth.
<strong>Responsorial Psalm (Ps 16)</strong>
<strong>R. You are my inheritance, O Lord!</strong>
Keep me, O God, for in you I take refuge. I say to the LORD, “My Lord are you. Apart from you I have no good.” <strong>R.</strong>
I bless the LORD who counsels me; even in the night my heart exhorts me. I set the LORD ever before me; with him at my right hand I shall not be disturbed. <strong>R.</strong>
You will show me the path to life, abounding joy in your presence, the delights at your right hand forever. <strong>R.</strong>
<strong>Gospel Acclamation (Jn 15:16)</strong>
Alleluia, alleluia. I chose you from the world, to go and bear fruit that will remain, says the Lord. Alleluia, alleluia.
<strong>Gospel (Jn 15:9-17)</strong>
<strong>A reading from the holy Gospel according to John.</strong>
Jesus said to his disciples: “As the Father loves me, so I also love you. Remain in my love. If you keep my commandments, you will remain in my love, just as I have kept my Father’s commandments and remain in his love. I have told you this so that my joy may be in you and your joy might be complete. This is my commandment: love one another as I love you. No one has greater love than this, to lay down one’s life for one’s friends. You are my friends if you do what I command you. I no longer call you slaves, because a slave does not know what his master is doing. I have called you friends, because I have told you everything I have heard from my Father. It was not you who chose me, but I who chose you and appointed you to go and bear fruit that will remain, so that whatever you ask the Father in my name he may give you. This I command you: love one another.”
<strong>Prayer over the Offerings</strong>
Lord God, may the sacrifice we offer you on this memorial of Saint Elizabeth Ann Seton be a sign of our loving service to you and our neighbor. We ask this through Christ our Lord.
<strong>Communion Antiphon (Jn 8:12)</strong>
The Lord says: I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life.
<strong>Prayer after Communion</strong>
Lord, may this Eucharist, which we have shared in memory of Saint Elizabeth Ann Seton, fill us with the spirit of your love. May we learn to love you and to serve you in our brothers and sisters. We ask this through Christ our Lord.`,
//         es: `<strong>MISA</strong>
// <strong>Antífona de entrada (Jer 17, 7-8)</strong>
// Bendito el hombre que confía en el Señor y pone en el Señor su confianza. Será como un árbol plantado junto al agua, que junto a la corriente echa sus raíces.
// <strong>Oración colecta</strong>
// Oh, Dios, que coronaste con el don de la verdadera fe a santa Isabel Ana Seton, concédenos, te rogamos, que, por su ejemplo e intercesión, crezcamos en amor por ti y nos dediquemos con celo al servicio de los necesitados. Por nuestro Señor Jesucristo, tu Hijo.
// <strong>Lectura (1 Jn 3, 14-18)</strong>
// <em>Lectura de la primera carta del apóstol san Juan.</em>
// Queridos hermanos, nosotros sabemos que hemos pasado de la muerte a la vida, porque amamos a los hermanos. El que no ama permanece en la muerte. Todo el que odia a su hermano es un homicida. Y sabéis que ningún homicida tiene vida eterna permanente en él. En esto hemos conocido el amor: en que él dio su vida por nosotros. Así también nosotros debemos dar la vida por los hermanos. Si alguno que posee bienes del mundo ve a su hermano que está necesitado y le cierra sus entrañas, ¿cómo puede permanecer en él el amor de Dios? Hijitos, no amemos de palabra ni de boca, sino de obra y de verdad.
// <strong>Salmo responsorial (Sal 16)</strong>
// <strong>R. ¡Tú eres mi heredad, Señor!</strong>
// Protégeme, Dios mío, que me refugio en ti. Yo digo al Señor: «Tú eres mi bien». <strong>R.</strong>
// Bendeciré al Señor, que me aconseja, hasta de noche me instruye internamente. Tengo siempre presente al Señor, con él a mi derecha no vacilaré. <strong>R.</strong>
// Me enseñarás el sendero de la vida, me saciarás de gozo en tu presencia, de alegría perpetua a tu derecha. <strong>R.</strong>
// <strong>Aclamación del Evangelio (Jn 15, 16)</strong>
// Aleluya, aleluya. Yo os he elegido del mundo —dice el Señor—, para que vayáis y deis fruto, y vuestro fruto permanezca. Aleluya, aleluya.
// <strong>Evangelio (Jn 15, 9-17)</strong>
// <strong>Lectura del santo Evangelio según san Juan.</strong>
// En aquel tiempo, dijo Jesús a sus discípulos: «Como el Padre me ha amado, así os he amado yo; permaneced en mi amor. Si guardáis mis mandamientos, permaneceréis en mi amor; lo mismo que yo he guardado los mandamientos de mi Padre y permanezco en su amor. Os he hablado de esto para que mi alegría esté en vosotros, y vuestra alegría llegue a plenitud. Este es mi mandamiento: que os améis unos a otros como yo os he amado. Nadie tiene amor más grande que el que da la vida por sus amigos. Vosotros sois mis amigos, si hacéis lo que yo os mando. Ya no os llamo siervos, porque el siervo no sabe lo que hace su señor: a vosotros os llamo amigos, porque todo lo que he oído a mi Padre os lo he dado a conocer. No sois vosotros los que me habéis elegido, soy yo quien os he elegido y os he destinado para que vayáis y deis fruto, y vuestro fruto permanezca. De modo que lo que pidáis al Padre en mi nombre os lo dé. Esto os mando: que os améis unos a otros».
// <strong>Oración sobre las ofrendas</strong>
// Señor, que el sacrificio que te ofrecemos en esta memoria de santa Isabel Ana Seton sea un signo de nuestro amoroso servicio a ti y a nuestro prójimo. Te lo pedimos por Cristo nuestro Señor.
// <strong>Antífona de comunión (Jn 8, 12)</strong>
// Dice el Señor: Yo soy la luz del mundo; el que me sigue no caminará en tinieblas, sino que tendrá la luz de la vida.
// <strong>Oración después de la comunión</strong>
// Señor, que esta Eucaristía, que hemos compartido en memoria de santa Isabel Ana Seton, nos llene del espíritu de tu amor. Que aprendamos a amarte y a servirte en nuestros hermanos. Te lo pedimos por Cristo nuestro Señor.`,
//         fr: `<strong>MESSE</strong>
// <strong>Antienne d'ouverture (Jr 17, 7-8)</strong>
// Béni soit l'homme qui met sa foi dans le Seigneur, dont le Seigneur est la confiance. Il est comme un arbre planté près des eaux, qui étend ses racines vers le courant.
// <strong>Prière d'ouverture</strong>
// Dieu qui as comblé sainte Élisabeth-Ann Seton du don de la vraie foi, accorde-nous, nous t'en prions, par son exemple et son intercession, de grandir dans ton amour et de nous dévouer avec zèle au service des nécessiteux. Par Jésus Christ, ton Fils, notre Seigneur.
// <strong>Lecture (1 Jn 3, 14-18)</strong>
// <em>Lecture de la première lettre de saint Jean.</em>
// Bien-aimés, nous savons que nous sommes passés de la mort à la vie, parce que nous aimons nos frères. Celui qui n'aime pas demeure dans la mort. Quiconque a de la haine pour son frère est un meurtrier, et vous savez que pas un meurtrier n'a la vie éternelle demeurant en lui. Voici comment nous avons connu l'amour : il a donné sa vie pour nous. Nous aussi, nous devons donner notre vie pour nos frères. Si quelqu'un, qui a les biens de ce monde, voit son frère dans le besoin et lui ferme ses entrailles, comment l'amour de Dieu demeurerait-il en lui ? Petits enfants, n'aimons pas en paroles ni par des discours, mais par des actes et en vérité.
// <strong>Psaume responsorial (Ps 16)</strong>
// <strong>R. Tu es, Seigneur, le partage de mon héritage !</strong>
// Garde-moi, mon Dieu : j'ai fait de toi mon refuge. J'ai dit au Seigneur : « Tu es mon Dieu ! Je n'ai pas d'autre bonheur que toi. » <strong>R.</strong>
// Je bénis le Seigneur qui me conseille : même la nuit mon cœur m'avertit. Je garde le Seigneur devant moi sans relâche ; il est à ma droite, je suis inébranlable. <strong>R.</strong>
// Tu m'apprendras le chemin de la vie : devant ta face, débordement de joie ! À ta droite, éternité de délices ! <strong>R.</strong>
// <strong>Acclamation de l'Évangile (Jn 15, 16)</strong>
// Alléluia, alléluia. C'est moi qui vous ai choisis du milieu du monde, afin que vous alliez, que vous portiez du fruit, et que votre fruit demeure, dit le Seigneur. Alléluia, alléluia.
// <strong>Évangile (Jn 15, 9-17)</strong>
// <strong>Lecture du saint Évangile selon saint Jean.</strong>
// En ce temps-là, Jésus disait à ses disciples : « Comme le Père m'a aimé, moi aussi je vous ai aimés. Demeurez dans mon amour. Si vous gardez mes commandements, vous demeurerez dans mon amour, comme moi, j'ai gardé les commandements de mon Père, et je demeure dans son amour. Je vous ai dit cela pour que ma joie soit en vous, et que votre joie soit parfaite. Mon commandement, le voici : Aimez-vous les uns les autres comme je vous ai aimés. Il n’y a pas de plus grand amour que de donner sa vie pour ceux qu’on aime. Vous êtes mes amis si vous faites ce que je vous commande. Je ne vous appelle plus serviteurs, car le serviteur ne sait pas ce que fait son maître ; je vous appelle mes amis, parce que tout ce que j'ai entendu de mon Père, je vous l'ai fait connaître. Ce n'est pas vous qui m'avez choisi, c'est moi qui vous ai choisis et établis, afin que vous alliez, que vous portiez du fruit, et que votre fruit demeure. Alors, tout ce que vous demanderez au Père en mon nom, il vous le donnera. Ce que je vous commande, c'est de vous aimer les uns les autres. »
// <strong>Prière sur les offrandes</strong>
// Seigneur notre Dieu, que le sacrifice que nous t'offrons en cette mémoire de sainte Élisabeth-Ann Seton soit un signe de notre service aimant envers toi et notre prochain. Nous te le demandons par le Christ notre Seigneur.
// <strong>Antienne de la communion (Jn 8, 12)</strong>
// Le Seigneur dit : Je suis la lumière du monde. Celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.
// <strong>Prière après la communion</strong>
// Seigneur, que cette Eucharistie, que nous avons partagée en mémoire de sainte Élisabeth-Ann Seton, nous remplisse de l'esprit de ton amour. Puissions-nous apprendre à t'aimer et à te servir en nos frères et sœurs. Nous te le demandons par le Christ notre Seigneur.`,
//         la: `<strong>MISSA</strong>
// <strong>Antiphona ad introitum (Ier 17, 7-8)</strong>
// Benedictus vir qui confidit in Domino, et erit Dominus fiducia eius. Et erit quasi lignum quod transplantatur super aquas, quod ad humorem mittit radices suas.
// <strong>Collecta</strong>
// Deus, qui sanctam Elisabeth Annam Seton verae fidei dono coronavisti, concede, quaesumus, ut, eius exemplo et intercessione, in tui amore crescamus et egentium servitio ardenter nos impendamus. Per Dominum nostrum Iesum Christum Filium tuum.
// <strong>Lectio (1 Io 3, 14-18)</strong>
// <em>Lectio Epistulae primae beati Ioannis Apostoli.</em>
// Carissimi, nos scimus quoniam transivimus de morte in vitam, quoniam diligimus fratres. Qui non diligit, manet in morte. Omnis qui odit fratrem suum, homicida est. Et scitis quoniam omnis homicida non habet vitam aeternam in se manentem. In hoc cognovimus caritatem, quoniam ille animam suam pro nobis posuit; et nos debemus pro fratribus animas ponere. Qui habuerit substantiam huius mundi, et viderit fratrem suum necessitatem habere, et clauserit viscera sua ab eo, quomodo caritas Dei manet in eo? Filioli, non diligamus verbo nec lingua, sed opere et veritate.
// <strong>Psalmus responsorius (Ps 16)</strong>
// <strong>R. Tu es, Domine, pars hereditatis meae.</strong>
// Conserva me, Deus, quoniam speravi in te. Dixi Domino: «Dominus meus es tu, bonum mihi non est sine te». <strong>R.</strong>
// Benedicam Dominum, qui tribuit mihi intellectum; insuper et usque ad noctem increpuerunt me renes mei. Providebam Dominum in conspectu meo semper; quoniam a dextris est mihi, non commovebor. <strong>R.</strong>
// Notas mihi facies vias vitae, adimpletionem laetitiae cum vultu tuo, delectationes in dextera tua usque in finem. <strong>R.</strong>
// <strong>Acclamatio ad Evangelium (Io 15, 16)</strong>
// Alleluia, alleluia. Ego vos elegi de mundo, ut eatis et fructum afferatis, et fructus vester maneat, dicit Dominus. Alleluia, alleluia.
// <strong>Evangelium (Io 15, 9-17)</strong>
// <strong>Lectio sancti Evangelii secundum Ioannem.</strong>
// In illo tempore, dixit Iesus discipulis suis: «Sicut dilexit me Pater, et ego dilexi vos. Manete in dilectione mea. Si praecepta mea servaveritis, manebitis in dilectione mea, sicut et ego Patris mei praecepta servavi, et maneo in eius dilectione. Haec locutus sum vobis, ut gaudium meum in vobis sit, et gaudium vestrum impleatur. Hoc est praeceptum meum, ut diligatis invicem, sicut dilexi vos. Maiorem hac dilectionem nemo habet, ut animam suam ponat quis pro amicis suis. Vos amici mei estis, si feceritis quae ego praecipio vobis. Iam non dico vos servos, quia servus nescit quid faciat dominus eius; vos autem dixi amicos, quia omnia quaecumque audivi a Patre meo, nota feci vobis. Non vos me elegistis, sed ego elegi vos, et posui vos ut eatis, et fructum afferatis, et fructus vester maneat; ut quodcumque petieritis Patrem in nomine meo, det vobis. Haec mando vobis, ut diligatis invicem».
// <strong>Oratio super oblata</strong>
// Domine Deus, sacrificium quod tibi offerimus in hac memoria sanctae Elisabeth Annae Seton, sit signum nostri amoris et servitii erga te et proximum. Per Christum Dominum nostrum.
// <strong>Antiphona ad communionem (Io 8, 12)</strong>
// Dicit Dominus: Ego sum lux mundi. Qui sequitur me, non ambulabit in tenebris, sed habebit lumen vitae.
// <strong>Post communionem</strong>
// Domine, haec Eucharistia, quam in memoriam sanctae Elisabeth Annae Seton sumpsimus, nos spiritu tui amoris impleat. Discamus te diligere et tibi in fratribus nostris servire. Per Christum Dominum nostrum.`
     
},
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'bl-rosalie-rendu',
    date: '02-07',
    title: {
      vi: 'Chân phước Rô-sa-li Ren-đu',
      en: 'Bl. Rosalie Rendu',
      // es: 'Beata Rosalía Rendu',
      // fr: 'Bienheureuse Rosalie Rendu',
      // la: 'Beata Rosalia Rendu'
    },
    subtitle: {
      vi: 'Nữ Tử Bác Ái',
      en: 'Daughter of Charity',
    //   es: 'Hija de la Caridad',
    //   fr: 'Fille de la Charité',
    //   la: 'Filia Caritatis'
    // },
    type: 'Lễ nhớ',
    sections: {
      biography: placeholder,
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'st-francis-regis-clet',
    date: '02-18',
    title: {
      vi: 'Thánh Phan-xi-cô Rê-gi-xê Cờ-lê',
      en: 'St. Francis Regis Clet',
      // es: 'San Francisco Régis Clet',
      // fr: 'Saint François-Régis Clet',
      // la: 'Sanctus Franciscus Regis Clet'
    },
    subtitle: {
      vi: 'Linh mục, Tử đạo',
      en: 'Priest, Martyr',
      // es: 'Sacerdote, Mártir',
      // fr: 'Prêtre, Martyr',
      // la: 'Sacerdos, Martyr'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: placeholder,
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'bl-pierre-rene-rogue',
    date: '03-03',
    title: {
      vi: 'Chân phước Pi-e Rơ-nê Rô-gơ',
      en: 'Bl. Pierre-René Rogue',
      // es: 'Beato Pedro Renato Rogue',
      // fr: 'Bienheureux Pierre-René Rogue',
      // la: 'Beatus Petrus Renatus Rogue'
    },
    subtitle: {
      vi: 'Linh mục, Tử đạo',
      en: 'Priest, Martyr',
      // es: 'Sacerdote, Mártir',
      // fr: 'Prêtre, Martyr',
      // la: 'Sacerdos, Martyr'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: placeholder,
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'bl-lindalva-justo-de-oliveira',
    date: '04-09',
    title: {
        vi: 'Chân phước Lindalva Justo de Oliveira',
        en: 'Bl. Lindalva Justo de Oliveira',
        // es: 'Beata Lindalva Justo de Oliveira',
        // fr: 'Bienheureuse Lindalva Justo de Oliveira',
        // la: 'Beata Lindalva Justo de Oliveira'
    },
    subtitle: {
        vi: 'Nữ Tử Bác Ái, Tử đạo',
        en: 'Daughter of Charity, Martyr',
        // es: 'Hija de la Caridad, Mártir',
        // fr: 'Fille de la Charité, Martyre',
        // la: 'Filia Caritatis, Martyr'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: placeholder,
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'bl-marguerite-rutan',
    date: '04-09',
    title: {
        vi: 'Chân phước Mác-ga-ri-ta Ru-tan',
        en: 'Bl. Marguerite Rutan',
        // es: 'Beata Margarita Rutan',
        // fr: 'Bienheureuse Marguerite Rutan',
        // la: 'Beata Margarita Rutan'
    },
    subtitle: {
        vi: 'Nữ Tử Bác Ái, Tử đạo',
        en: 'Daughter of Charity, Martyr',
        // es: 'Hija de la Caridad, Mártir',
        // fr: 'Fille de la Charité, Martyre',
        // la: 'Filia Caritatis, Martyr'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: placeholder,
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'founding-cm',
    date: '04-17',
    title: {
      vi: 'Kỷ niệm Thành lập Tu hội Truyền giáo',
      en: 'Commemoration of the Founding of the Congregation of the Mission',
      // es: 'Conmemoración de la Fundación de la Congregación de la Misión',
      // fr: 'Commémoration de la Fondation de la Congrégation de la Mission',
      // la: 'Commemoratio Fundationis Congregationis Missionis'
    },
    subtitle: {
      vi: 'Ngày 17 tháng 4 năm 1625',
      en: 'April 17, 1625',
      // es: '17 de abril de 1625',
      // fr: '17 avril 1625',
      // la: '17 Aprilis 1625'
    },
    type: 'Kỷ niệm',
    sections: {
      biography: {
        vi: '<strong>Lịch sử</strong><br>Thánh Vinh Sơn Phaolô, do lòng trắc ẩn trước sự nghèo đói về mặt thiêng liêng của người dân nông thôn, đã thành lập Tu hội Truyền giáo vào ngày 17 tháng 4 năm 1625, thông qua một hợp đồng với gia đình de Gondi. Cộng đoàn mới gồm các linh mục và tu sĩ đã tự hiến dâng để rao giảng các cuộc đại phúc cho người nghèo ở nông thôn và đào tạo một hàng giáo sĩ đức hạnh. Điều này đã đánh dấu sự khởi đầu của một gia đình thiêng liêng trên toàn thế giới, cam kết loan báo Tin Mừng và phục vụ những người bị bỏ rơi nhất.',
        en: '<strong>History</strong><br>St. Vincent de Paul, moved by the spiritual poverty of the rural people, established the Congregation of the Mission on April 17, 1625, through a contract with the de Gondi family. The new community of priests and brothers dedicated themselves to preaching missions to the poor in the countryside and forming a virtuous clergy. This marked the beginning of a worldwide spiritual family committed to evangelizing and serving the most abandoned.',
        // es: '<strong>Historia</strong><br>San Vicente de Paúl, movido por la pobreza espiritual de la gente del campo, estableció la Congregación de la Misión el 17 de abril de 1625, mediante un contrato con la familia de Gondi. La nueva comunidad de sacerdotes y hermanos se dedicó a predicar misiones a los pobres del campo y a formar un clero virtuoso. Esto marcó el comienzo de una familia espiritual mundial comprometida con la evangelización y el servicio a los más abandonados.',
        // fr: '<strong>Histoire</strong><br>Saint Vincent de Paul, ému par la pauvreté spirituelle des populations rurales, a fondé la Congrégation de la Mission le 17 avril 1625, par un contrat avec la famille de Gondi. La nouvelle communauté de prêtres et de frères s\'est consacrée à la prédication de missions pour les pauvres dans les campagnes et à la formation d\'un clergé vertueux. Cela a marqué le début d\'une famille spirituelle mondiale engagée dans l\'évangélisation et le service des plus abandonnés.',
        // la: '<strong>Historia</strong><br>Sanctus Vincentius a Paulo, paupertate spirituali populi rustici motus, Congregationem Missionis die 17 Aprilis 1625 condidit, per contractum cum familia de Gondi. Nova communitas sacerdotum et fratrum se dedicaverunt ad missiones praedicandas pauperibus in agris et ad clerum virtuosum formandum. Hoc initium notavit familiae spiritualis per orbem terrarum commissae evangelizandi et serviendi maxime derelictis.'
     
      },
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'transfer-relics-st-vincent',
    date: '04-27',
    title: {
        vi: 'Lễ Cung nghinh Xương Thánh Vinh Sơn',
        en: 'Transfer of the Relics of St. Vincent',
        // es: 'Traslación de las Reliquias de San Vicente',
        // fr: 'Translation des Reliques de Saint Vincent',
        // la: 'Translatio Reliquiarum S. Vincentii'
    },
    subtitle: {
        vi: 'Kỷ niệm việc di chuyển thánh tích của Thánh Vinh Sơn Phaolô',
        en: 'Commemoration of the moving of the relics of St. Vincent de Paul',
        // es: 'Conmemoración del traslado de las reliquias de San Vicente de Paúl',
        // fr: 'Commémoration du transfert des reliques de Saint Vincent de Paul',
        // la: 'Commemoratio translationis reliquiarum S. Vincentii a Paulo'
    },
    type: 'Kỷ niệm',
    sections: {
      biography: placeholder,
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'st-louise-de-marillac',
    date: '05-09',
    title: {
      vi: 'Thánh Lu-y-sa đờ Ma-ri-lắc',
      en: 'St. Louise de Marillac',
      // es: 'Santa Luisa de Marillac',
      // fr: 'Sainte Louise de Marillac',
      // la: 'Sancta Ludovica de Marillac'
    },
    subtitle: {
      vi: 'Đồng sáng lập Tu hội Nữ Tử Bác Ái',
      en: 'Co-foundress of the Daughters of Charity',
      // es: 'Cofundadora de las Hijas de la Caridad',
      // fr: 'Co-fondatrice des Filles de la Charité',
      // la: 'Cofundatrix Filiarum Caritatis'
    },
    type: 'Đại lễ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
Thánh Lu-y-sa đờ Ma-ri-lắc sinh ngày 12 tháng 8 năm 1591, có thể là tại Paris, trong một gia đình quý tộc. Ngài không biết mẹ mình là ai. Lớn lên, ngài khao khát dâng mình cho Chúa trong đời sống tu trì nhưng sức khỏe mỏng manh đã ngăn cản ngài. Thay vào đó, ngài kết hôn với Antoine Le Gras, thư ký của hoàng hậu, vào năm 1613. Hai người có một con trai tên là Michel.
Sau khi chồng qua đời vào năm 1625, Lu-y-sa trải qua một giai đoạn khó khăn về tinh thần. Chính trong thời gian này, ngài đã gặp Thánh Vinh Sơn Phaolô, người đã trở thành linh hướng của ngài. Dưới sự hướng dẫn của Thánh Vinh Sơn, Lu-y-sa đã tìm thấy ơn gọi đích thực của mình trong việc phục vụ người nghèo.
Năm 1633, cùng với Thánh Vinh Sơn, Lu-y-sa đã quy tụ những thiếu nữ nông thôn đầu tiên để thành lập Tu hội Nữ Tử Bác Ái, một cộng đoàn các nữ tu không có tu viện, sống giữa người nghèo để phục vụ họ. Lu-y-sa đã đào tạo các chị em, tổ chức công việc của họ và đi khắp nước Pháp để thành lập các cộng đoàn phục vụ người nghèo khổ, bệnh tật, trẻ mồ côi và những người bị bỏ rơi.
Với lòng tin tưởng tuyệt đối vào Chúa Quan Phòng, một trí thông minh sắc sảo và một trái tim đầy yêu thương, Lu-y-sa đã trở thành một nhà tổ chức bác ái vĩ đại. Ngài qua đời tại Paris vào ngày 15 tháng 3 năm 1660, vài tháng trước Thánh Vinh Sơn. Ngài được Đức Giáo Hoàng Piô XI phong thánh năm 1934 và được Đức Giáo Hoàng Gioan XXIII tôn làm bổn mạng của các nhân viên xã hội Công giáo năm 1960.`,
        en: `<strong>Biography</strong>
St. Louise de Marillac was born on August 12, 1591, probably in Paris, into a noble family. She never knew her mother. As a young woman, she desired to consecrate herself to God in religious life, but her fragile health prevented her. Instead, she married Antoine Le Gras, secretary to the queen, in 1613. They had one son, Michel.
After her husband's death in 1625, Louise went through a period of spiritual distress. It was during this time that she met St. Vincent de Paul, who became her spiritual director. Under his guidance, Louise found her true calling in serving the poor.
In 1633, with St. Vincent, Louise gathered the first country girls to form the Company of the Daughters of Charity, a community of unenclosed sisters who lived among the poor to serve them. Louise trained the sisters, organized their work, and traveled throughout France establishing communities to serve the destitute, the sick, orphans, and the abandoned.
With immense trust in Providence, a keen intellect, and a heart full of love, Louise became a great organizer of charity. She died in Paris on March 15, 1660, a few months before St. Vincent. She was canonized by Pope Pius XI in 1934 and declared Patroness of Christian Social Workers by Pope John XXIII in 1960.`,
//         es: `<strong>Biografía</strong>
// Santa Luisa de Marillac nació el 12 de agosto de 1591, probablemente en París, en el seno de una familia noble. Nunca conoció a su madre. De joven, deseaba consagrarse a Dios en la vida religiosa, pero su frágil salud se lo impidió. En su lugar, se casó con Antonio Le Gras, secretario de la reina, en 1613. Tuvieron un hijo, Miguel.
// Tras la muerte de su esposo en 1625, Luisa atravesó un período de angustia espiritual. Fue durante este tiempo que conoció a San Vicente de Paúl, quien se convirtió en su director espiritual. Bajo su guía, Luisa encontró su verdadera vocación en el servicio a los pobres.
// En 1633, junto con San Vicente, Luisa reunió a las primeras jóvenes del campo para formar la Compañía de las Hijas de la Caridad, una comunidad de hermanas sin clausura que vivían entre los pobres para servirles. Luisa formó a las hermanas, organizó su trabajo y viajó por toda Francia estableciendo comunidades para servir a los desamparados, los enfermos, los huérfanos y los abandonados.
// Con una inmensa confianza en la Providencia, un intelecto agudo y un corazón lleno de amor, Luisa se convirtió en una gran organizadora de la caridad. Murió en París el 15 de marzo de 1660, pocos meses antes que San Vicente. Fue canonizada por el Papa Pío XI en 1934 y declarada Patrona de los Asistentes Sociales Cristianos por el Papa Juan XXIII en 1960.`,
//         fr: `<strong>Biographie</strong>
// Sainte Louise de Marillac est née le 12 août 1591, probablement à Paris, dans une famille noble. Elle n'a jamais connu sa mère. Jeune femme, elle désirait se consacrer à Dieu dans la vie religieuse, mais sa santé fragile l'en empêcha. À la place, elle épousa Antoine Le Gras, secrétaire de la reine, en 1613. Ils eurent un fils, Michel.
// Après la mort de son mari en 1625, Louise traversa une période de détresse spirituelle. C'est à cette époque qu'elle rencontra saint Vincent de Paul, qui devint son directeur spirituel. Sous sa direction, Louise trouva sa véritable vocation dans le service des pauvres.
// En 1633, avec saint Vincent, Louise rassembla les premières filles de la campagne pour former la Compagnie des Filles de la Charité, une communauté de sœurs non cloîtrées qui vivaient au milieu des pauvres pour les servir. Louise forma les sœurs, organisa leur travail et parcourut la France pour établir des communautés au service des démunis, des malades, des orphelins et des abandonnés.
// Avec une immense confiance en la Providence, une intelligence vive et un cœur plein d'amour, Louise devint une grande organisatrice de la charité. Elle mourut à Paris le 15 mars 1660, quelques mois avant saint Vincent. Elle fut canonisée par le pape Pie XI en 1934 et déclarée patronne des travailleurs sociaux chrétiens par le pape Jean XXIII en 1960.`,
//         la: `<strong>Vita</strong>
// Sancta Ludovica de Marillac nata est die 12 Augusti 1591, verisimiliter Lutetiae Parisiorum, in familia nobili. Matrem suam numquam novit. Iuvenis, Deo se in vita religiosa consecrare cupiebat, sed infirma valetudo eam impedivit. Potius, Antonio Le Gras, reginae secretario, anno 1613 nupsit. Unum filium, Michaelem, habuerunt.
// Post mortem mariti anno 1625, Ludovica tempus angustiae spiritualis transiit. Hoc tempore Sanctum Vincentium a Paulo convenit, qui eius director spiritualis factus est. Sub eius ductu, Ludovica veram suam vocationem in servitio pauperum invenit.
// Anno 1633, cum Sancto Vincentio, Ludovica primas puellas rusticas congregavit ad Societatem Filiarum Caritatis formandam, communitatem sororum non clausuratarum quae inter pauperes vivebant ut eis servirent. Ludovica sorores instituit, opera earum ordinavit et per totam Galliam iter fecit ad communitates instituendas ad egenos, infirmos, orphanos et derelictos adiuvandos.
// Cum immensa fiducia in Providentiam, acuto ingenio et corde pleno amore, Ludovica magna caritatis ordinatrix facta est. Lutetiae Parisiorum obiit die 15 Martii 1660, paucis mensibus ante Sanctum Vincentium. A Pio Papa XI anno 1934 canonizata est et a Ioanne Papa XXIII anno 1960 Patronam Operariorum Socialium Christianorum declarata est.`
      
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>
<strong>Ca nhập lễ (Cn 31, 20. 26)</strong>
Bà rộng tay giúp người nghèo khó, và đưa tay cứu kẻ khốn cùng. Miệng bà nói lên lời khôn ngoan, và lưỡi bà dạy điều nhân hậu.
<strong>Lời nguyện nhập lễ</strong>
Lạy Thiên Chúa là Cha nhân ái, Chúa đã ban cho thánh nữ Lu-y-sa trở nên người mẹ của những người nghèo khổ. Xin cho chúng con, khi noi gương bắt chước đức ái của ngài, cũng biết phục vụ Đức Kitô nơi những anh chị em thiếu thốn, để mai sau được cùng ngài hưởng phúc Nước Trời. Chúng con cầu xin.
<strong>Bài đọc (Cn 31, 10-13, 19-20, 30-31)</strong>
<em>Bài trích sách Châm Ngôn.</em>
Một người vợ tài đức, ai mà tìm thấy? Nàng quý giá hơn châu ngọc rất nhiều. Chồng nàng hết dạ tin tưởng nàng, chàng sẽ chẳng thiếu chi lợi lộc. Suốt đời, nàng đem lại hạnh phúc chứ không gây tai họa cho chồng. Nàng tìm len và vải gai, rồi vui vẻ ra tay làm việc. Tay nàng cầm con quay và biết dùng xa sợi. Nàng rộng tay giúp người nghèo khó, và đưa tay cứu kẻ khốn cùng. Duyên dáng là giả trá, sắc đẹp là phù vân. Người phụ nữ kính sợ Đức Chúa mới đáng cho người đời ca tụng. Hãy để cho nàng hưởng những thành quả tay nàng đã làm ra. Ước gì nơi cổng thành nàng được mọi người ca ngợi.
<strong>Đáp ca (Tv 33)</strong>
<strong>Đ. Kẻ nghèo hèn kêu xin, và Chúa đã nhậm lời.</strong>
Tôi sẽ không ngừng chúc tụng Chúa, câu hát mừng Người chẳng ngớt trên môi. Linh hồn tôi hãnh diện vì Chúa, xin các bạn nghèo nghe tôi nói mà vui lên. <strong>Đ.</strong>
Hãy cùng tôi ca ngợi Chúa, ta đồng thanh tán tạ danh Người. Tôi đã tìm kiếm Chúa, và Người đáp lại, giải thoát cho khỏi mọi nỗi kinh hoàng. <strong>Đ.</strong>
Ai nhìn lên Chúa sẽ vui tươi hớn hở, không bao giờ bẽ mặt hổ ngươi. Kẻ nghèo hèn này kêu xin, và Chúa đã nhậm lời, cứu cho khỏi mọi cơn nguy khốn. <strong>Đ.</strong>
<strong>Tung hô Tin Mừng (Mt 11, 28)</strong>
Ha-lê-lu-i-a. Ha-lê-lu-i-a. Chúa nói: “Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng tôi, tôi sẽ cho nghỉ ngơi bồi dưỡng”. Ha-lê-lu-i-a.
<strong>Tin Mừng (Mt 11, 25-30)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu.</strong>
Khi ấy, Đức Giêsu cất tiếng nói: “Lạy Cha là Chúa Tể trời đất, con xin ngợi khen Cha, vì Cha đã giấu không cho bậc khôn ngoan thông thái biết những điều này, nhưng lại mặc khải cho những người bé mọn. Vâng, lạy Cha, vì đó là điều đẹp ý Cha. Cha tôi đã giao phó mọi sự cho tôi. Và không ai biết rõ người Con, trừ Chúa Cha; cũng như không ai biết rõ Chúa Cha, trừ người Con và kẻ mà người Con muốn mặc khải cho. Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng tôi, tôi sẽ cho nghỉ ngơi bồi dưỡng. Anh em hãy mang lấy ách của tôi, và hãy học với tôi, vì tôi có lòng hiền hậu và khiêm nhường. Tâm hồn anh em sẽ được nghỉ ngơi bồi dưỡng. Vì ách của tôi thì êm ái, và gánh của tôi thì nhẹ nhàng”.
<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin thương nhận của lễ chúng con dâng, và cho chúng con được thấm nhuần tinh thần bác ái mà Chúa đã khơi dậy nơi thánh nữ Lu-y-sa, để chúng con biết phụng sự Chúa và phục vụ anh chị em. Chúng con cầu xin.
<strong>Ca hiệp lễ (Mt 25, 40)</strong>
Chúa nói: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”.
<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, chúng con vừa lãnh nhận Mình và Máu Thánh Con Chúa. Xin cho chúng con biết noi gương thánh nữ Lu-y-sa, luôn nhạy bén trước mọi nỗi khổ đau của con người, để có thể trở nên chứng nhân cho tình yêu của Chúa giữa trần gian. Chúng con cầu xin.`,
        en: `<strong>MASS</strong>
<strong>Entrance Antiphon (Prov 31:20, 26)</strong>
She opens her hand to the poor and reaches out her hands to the needy. She opens her mouth with wisdom, and the teaching of kindness is on her tongue.
<strong>Collect</strong>
O God, Father of mercies, who made Saint Louise a mother to the poor, grant, we pray, that, imitating her charity, we may serve Christ in our needy brothers and sisters and so merit to be part of your Kingdom. Through our Lord Jesus Christ, your Son.
<strong>Reading (Prov 31:10-13, 19-20, 30-31)</strong>
<em>A reading from the Book of Proverbs.</em>
Who can find a virtuous woman? For her price is far above rubies. The heart of her husband doth safely trust in her, so that he shall have no need of spoil. She will do him good and not evil all the days of her life. She seeketh wool, and flax, and worketh willingly with her hands. She layeth her hands to the spindle, and her hands hold the distaff. She stretcheth out her hand to the poor; yea, she reacheth forth her hands to the needy. Charm is deceitful, and beauty is vain, but a woman who fears the LORD is to be praised. Give her of the fruit of her hands, and let her own works praise her in the gates.
<strong>Responsorial Psalm (Ps 34)</strong>
<strong>R. The Lord hears the cry of the poor.</strong>
I will bless the LORD at all times; his praise shall be ever in my mouth. Let my soul glory in the LORD; the lowly will hear me and be glad. <strong>R.</strong>
Glorify the LORD with me, let us together extol his name. I sought the LORD, and he answered me and delivered me from all my fears. <strong>R.</strong>
Look to him that you may be radiant with joy, and your faces may not blush with shame. When the poor one called out, the LORD heard, and from all his distress he saved him. <strong>R.</strong>
<strong>Gospel Acclamation (Mt 11:28)</strong>
Alleluia, alleluia. Come to me, all you who labor and are burdened, and I will give you rest, says the Lord. Alleluia, alleluia.
<strong>Gospel (Mt 11:25-30)</strong>
<strong>A reading from the holy Gospel according to Matthew.</strong>
At that time Jesus exclaimed: “I give praise to you, Father, Lord of heaven and earth, for although you have hidden these things from the wise and the learned you have revealed them to little ones. Yes, Father, such has been your gracious will. All things have been handed over to me by my Father. No one knows the Son except the Father, and no one knows the Father except the Son and anyone to whom the Son wishes to reveal him. Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves. For my yoke is easy, and my burden light.”
<strong>Prayer over the Offerings</strong>
Graciously accept, O Lord, the gifts we bring, and grant that, filled with the same spirit of charity with which you endowed Saint Louise, we may serve you and our neighbor. Through Christ our Lord.
<strong>Communion Antiphon (Mt 25:40)</strong>
The Lord says: Amen, I say to you, whatever you did for one of these least brothers of mine, you did for me.
<strong>Prayer after Communion</strong>
Renewed by the Body and Blood of your Son, we pray, O Lord, that, following the example of Saint Louise, we may be attentive to the needs of all and so become witnesses to your love in the world. Through Christ our Lord.`,
//         es: `<strong>MISA</strong>
// <strong>Antífona de entrada (Prov 31, 20. 26)</strong>
// Alarga su palma al desvalido y tiende sus manos al pobre. Abre su boca a la sabiduría, y su lengua enseña la piedad.
// <strong>Oración colecta</strong>
// Oh, Dios, Padre de las misericordias, que hiciste de santa Luisa una madre para los pobres, concédenos, te rogamos, que, imitando su caridad, sirvamos a Cristo en nuestros hermanos necesitados y así merezcamos ser parte de tu Reino. Por nuestro Señor Jesucristo, tu Hijo.
// <strong>Lectura (Prov 31, 10-13, 19-20, 30-31)</strong>
// <em>Lectura del libro de los Proverbios.</em>
// Una mujer fuerte, ¿quién la hallará? Vale mucho más que las perlas. Su marido se fía de ella, y no le faltan riquezas. Le trae el bien y no el mal, todos los días de su vida. Busca la lana y el lino, y los trabaja con la destreza de sus manos. Aplica sus manos a la rueca, y sus dedos manejan el huso. Tiende su mano al pobre, y alarga sus brazos al necesitado. Engañosa es la gracia, vana la hermosura; la mujer que teme al Señor, ésa será alabada. Dadle el fruto de sus manos, y que en las puertas la alaben sus obras.
// <strong>Salmo responsorial (Sal 34)</strong>
// <strong>R. El Señor escucha el clamor de los pobres.</strong>
// Bendigo al Señor en todo momento, su alabanza está siempre en mi boca. Mi alma se gloría en el Señor: que los humildes lo escuchen y se alegren. <strong>R.</strong>
// Engrandeced conmigo al Señor, ensalcemos juntos su nombre. Consulté al Señor, y me respondió, me libró de todas mis ansias. <strong>R.</strong>
// Contempladlo, y quedaréis radiantes, vuestro rostro no se avergonzará. Si el afligido invoca al Señor, él lo escucha y lo salva de sus angustias. <strong>R.</strong>
// <strong>Aclamación del Evangelio (Mt 11, 28)</strong>
// Aleluya, aleluya. Venid a mí todos los que estáis cansados y agobiados, y yo os aliviaré, dice el Señor. Aleluya, aleluya.
// <strong>Evangelio (Mt 11, 25-30)</strong>
// <strong>Lectura del santo Evangelio según san Mateo.</strong>
// En aquel tiempo, exclamó Jesús: «Te doy gracias, Padre, Señor de cielo y tierra, porque has escondido estas cosas a los sabios y entendidos y se las has revelado a la gente sencilla. Sí, Padre, así te ha parecido mejor. Todo me lo ha entregado mi Padre, y nadie conoce al Hijo más que el Padre, y nadie conoce al Padre sino el Hijo y aquel a quien el Hijo se lo quiera revelar. Venid a mí todos los que estáis cansados y agobiados, y yo os aliviaré. Cargad con mi yugo y aprended de mí, que soy manso y humble de corazón, y encontraréis descanso para vuestras almas. Porque mi yugo es llevadero y mi carga ligera».
// <strong>Oración sobre las ofrendas</strong>
// Acepta con bondad, Señor, los dones que te presentamos, y concédenos que, llenos del mismo espíritu de caridad con que dotaste a santa Luisa, te sirvamos a ti y a nuestro prójimo. Por Cristo, nuestro Señor.
// <strong>Antífona de comunión (Mt 25, 40)</strong>
// Dice el Señor: En verdad os digo que cuanto hicisteis a uno de estos mis hermanos más pequeños, a mí me lo hicisteis.
// <strong>Oración después de la comunión</strong>
// Renovados por el Cuerpo y la Sangre de tu Hijo, te pedimos, Señor, que, siguiendo el ejemplo de santa Luisa, estemos atentos a las necesidades de todos y así nos convirtamos en testigos de tu amor en el mundo. Por Cristo, nuestro Señor.`,
//         fr: `<strong>MESSE</strong>
// <strong>Antienne d'ouverture (Pr 31, 20. 26)</strong>
// Elle ouvre sa main au malheureux et tend les bras au pauvre. Elle ouvre la bouche avec sagesse, et une leçon de bonté est sur sa langue.
// <strong>Prière d'ouverture</strong>
// Dieu, Père des miséricordes, qui as fait de sainte Louise une mère pour les pauvres, accorde-nous, nous t'en prions, qu'à l'imitation de sa charité, nous servions le Christ dans nos frères et sœurs dans le besoin et méritions ainsi de faire partie de ton Royaume. Par Jésus Christ, ton Fils.
// <strong>Lecture (Pr 31, 10-13, 19-20, 30-31)</strong>
// <em>Lecture du livre des Proverbes.</em>
// Une femme vaillante, qui la trouvera ? Elle est infiniment plus précieuse que les perles. Le cœur de son mari a confiance en elle, et les profits ne lui feront pas défaut. Elle lui fait du bien, et non du mal, tous les jours de sa vie. Elle se procure de la laine et du lin, et travaille d'une main joyeuse. Elle met la main à la quenouille, et ses doigts tiennent le fuseau. Elle tend la main au malheureux, et ouvre ses bras à l'indigent. La grâce est trompeuse, et la beauté est vaine ; la femme qui craint le Seigneur est celle qui sera louée. Donnez-lui du fruit de ses mains, et qu'aux portes ses œuvres la louent.
// <strong>Psaume responsorial (Ps 34)</strong>
// <strong>R. Le Seigneur entend le cri des pauvres.</strong>
// Je bénirai le Seigneur en tout temps, sa louange sans cesse à mes lèvres. Je me glorifierai dans le Seigneur : que les pauvres m'entendent et soient en fête ! <strong>R.</strong>
// Magnifiez avec moi le Seigneur, exaltons tous ensemble son nom. J'ai cherché le Seigneur, il m'a répondu, de toutes mes terreurs il m'a délivré. <strong>R.</strong>
// Qui regarde vers lui resplendira, sans ombre ni trouble au visage. Un pauvre crie, le Seigneur entend, il le sauve de toutes ses angoisses. <strong>R.</strong>
// <strong>Acclamation de l'Évangile (Mt 11, 28)</strong>
// Alléluia, alléluia. Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos, dit le Seigneur. Alléluia, alléluia.
// <strong>Évangile (Mt 11, 25-30)</strong>
// <strong>Lecture du saint Évangile selon saint Matthieu.</strong>
// En ce temps-là, Jésus prit la parole et dit : « Père, Seigneur du ciel et de la terre, je proclame ta louange : ce que tu as caché aux sages et aux savants, tu l'as révélé aux tout-petits. Oui, Père, tu l'as voulu ainsi dans ta bienveillance. Tout m'a été remis par mon Père ; personne ne connaît le Fils, sinon le Père, et personne ne connaît le Père, sinon le Fils, et celui à qui le Fils veut le révéler. Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos. Prenez sur vous mon joug, devenez mes disciples, car je suis doux et humble de cœur, et vous trouverez le repos pour votre âme. Oui, mon joug est facile à porter, et mon fardeau, léger. »
// <strong>Prière sur les offrandes</strong>
// Accepte avec bonté, Seigneur, les dons que nous t'apportons, et accorde-nous, remplis du même esprit de charité dont tu as doté sainte Louise, de te servir, toi et notre prochain. Par le Christ, notre Seigneur.
// <strong>Antienne de la communion (Mt 25, 40)</strong>
// Le Seigneur dit : Amen, je vous le dis, chaque fois que vous l'avez fait à l'un de ces plus petits de mes frères, c'est à moi que vous l'avez fait.
// <strong>Prière après la communion</strong>
// Renouvelés par le Corps et le Sang de ton Fils, nous te prions, Seigneur, qu'à l'exemple de sainte Louise, nous soyons attentifs aux besoins de tous et devenions ainsi témoins de ton amour dans le monde. Par le Christ, notre Seigneur.`,
//         la: `<strong>MISSA</strong>
// <strong>Antiphona ad introitum (Prov 31, 20. 26)</strong>
// Manum suam aperuit inopi et palmas suas extendit ad pauperem. Os suum aperuit sapientiae, et lex clementiae in lingua eius.
// <strong>Collecta</strong>
// Deus, Pater misericordiarum, qui sanctam Ludovicam pauperum matrem effecisti, concede, quaesumus, ut, eius caritatem imitantes, Christo in fratribus nostris egentibus serviamus et sic Regni tui participes esse mereamur. Per Dominum nostrum Iesum Christum Filium tuum.
// <strong>Lectio (Prov 31, 10-13, 19-20, 30-31)</strong>
// <em>Lectio libri Proverbiorum.</em>
// Mulierem fortem quis inveniet? Procul et de ultimis finibus pretium eius. Confidit in ea cor viri sui, et spoliis non indigebit. Reddet ei bonum, et non malum, omnibus diebus vitae suae. Quaesivit lanam et linum, et operata est consilio manuum suarum. Posuit manum suam ad fortia, et digiti eius apprehenderunt fusum. Manum suam aperuit inopi, et palmas suas extendit ad pauperem. Fallax gratia, et vana est pulchritudo; mulier timens Dominum, ipsa laudabitur. Date ei de fructu manuum suarum, et laudent eam in portis opera eius.
// <strong>Psalmus responsorius (Ps 34)</strong>
// <strong>R. Clamant pauperes, et Dominus exaudit.</strong>
// Benedicam Dominum in omni tempore; semper laus eius in ore meo. In Domino laudabitur anima mea; audiant mansueti, et laetentur. <strong>R.</strong>
// Magnificate Dominum mecum, et exaltemus nomen eius in idipsum. Exquisivi Dominum, et exaudivit me; et ex omnibus tribulationibus meis eripuit me. <strong>R.</strong>
// Accedite ad eum, et illuminamini, et facies vestrae non confundentur. Iste pauper clamavit, et Dominus exaudivit eum; et ex omnibus tribulationibus eius salvavit eum. <strong>R.</strong>
// <strong>Acclamatio ad Evangelium (Mt 11, 28)</strong>
// Alleluia, alleluia. Venite ad me, omnes qui laboratis et onerati estis, et ego reficiam vos, dicit Dominus. Alleluia, alleluia.
// <strong>Evangelium (Mt 11, 25-30)</strong>
// <strong>Lectio sancti Evangelii secundum Matthaeum.</strong>
// In illo tempore respondens Iesus dixit: «Confiteor tibi, Pater, Domine caeli et terrae, quia abscondisti haec a sapientibus et prudentibus, et revelasti ea parvulis. Ita, Pater, quoniam sic fuit placitum ante te. Omnia mihi tradita sunt a Patre meo. Et nemo novit Filium, nisi Pater; neque Patrem quis novit, nisi Filius, et cui voluerit Filius revelare. Venite ad me, omnes, qui laboratis et onerati estis, et ego reficiam vos. Tollite iugum meum super vos, et discite a me, quia mitis sum et humilis corde, et invenietis requiem animabus vestris. Iugum enim meum suave est, et onus meum leve est».
// <strong>Oratio super oblata</strong>
// Oblata nostra, quaesumus, Domine, benigne suscipe, et concede ut, eodem caritatis spiritu repleti, quo sanctam Ludovicam imbuisti, tibi et proximo serviamus. Per Christum Dominum nostrum.
// <strong>Antiphona ad communionem (Mt 25, 40)</strong>
// Dicit Dominus: Amen dico vobis: Quamdiu fecistis uni ex his fratribus meis minimis, mihi fecistis.
// <strong>Post communionem</strong>
// Corpore et Sanguine Filii tui refecti, quaesumus, Domine, ut, exemplo sanctae Ludovicae, omnium necessitatibus attenti, testes amoris tui in mundo efficiamur. Per Christum Dominum nostrum.`
    
},
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
];


// START OF FILE: components/Spinner.tsx
const Spinner = () => {
  return React.createElement(
    "div",
    { className: "flex justify-center items-center py-10" },
    React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400" })
  );
};


// START OF FILE: components/ThemeSwitcher.tsx
const THEMES = [
  { id: 'classic', name: 'Cổ Điển', colors: ['bg-[#fdf6e3]', 'bg-[#eee8d5]'] },
  { id: 'light', name: 'Sáng', colors: ['bg-white', 'bg-gray-100'] },
  { id: 'dark', name: 'Tối', colors: ['bg-gray-900', 'bg-gray-800'] },
  { id: 'black', name: 'Đen', colors: ['bg-black', 'bg-neutral-900'] },
  { id: 'light-blue', name: 'Xanh Nhạt', colors: ['bg-[#f0f9ff]', 'bg-[#e0f2fe]'] },
  { id: 'wood', name: 'Gỗ', colors: ['bg-[#f5f5dc]', 'bg-[#e3d1b1]'] },
];

const ThemeSwitcher = ({ currentTheme, onThemeChange, onClose }) => {
  const handleThemeSelect = (theme) => {
    onThemeChange(theme);
    onClose();
  };

  return React.createElement(
    "div",
    { 
      className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden",
      onClick: onClose 
    },
    React.createElement(
      "div",
      { 
        className: "relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-6 w-full max-w-sm",
        onClick: (e) => e.stopPropagation() 
      },
      React.createElement(
        "button",
        { type: "button", onClick: onClose, className: "absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10", "aria-label": "Đóng" },
        "×"
      ),
      React.createElement("h3", { className: "text-xl font-semibold text-center mb-6 text-[var(--text-primary)]" }, "Chọn Giao Diện"),
      React.createElement(
        "div",
        { className: "grid grid-cols-2 gap-4" },
        THEMES.map((theme) => React.createElement(
          "div",
          { key: theme.id, onClick: () => handleThemeSelect(theme.id), className: "cursor-pointer" },
          React.createElement(
            "div",
            {
              className: `w-full h-20 rounded-lg flex overflow-hidden border-2 ${
                currentTheme === theme.id ? 'border-[var(--border-accent)]' : 'border-transparent'
              } transition-all`
            },
            React.createElement("div", { className: `w-1/2 ${theme.colors[0]}` }),
            React.createElement("div", { className: `w-1/2 ${theme.colors[1]}` })
          ),
          React.createElement(
            "p",
            {
              className: `text-center mt-2 text-sm font-medium ${
                currentTheme === theme.id ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'
              }`
            },
            theme.name
          )
        ))
      )
    )
  );
};


// START OF FILE: components/Header.tsx
const Header = ({
  onGoBack,
  showBackButton,
  currentLanguage,
  languages,
  defaultLanguage,
  onLanguageChange,
  onAdminClick,
  onLogout,
  isAdmin,
  logoUrl,
  title,
  subtitle,
  onTitleClick,
  onAboutClick,
  onThemeChange,
  currentTheme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const langMenuRef = useRef(null);
  const langButtonRef = useRef(null);
  const adminMenuRef = useRef(null);
  const adminButtonRef = useRef(null);
  
  const getML = (textObj) => getMultilingualText(textObj, currentLanguage, defaultLanguage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target) && langButtonRef.current && !langButtonRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target) && adminButtonRef.current && !adminButtonRef.current.contains(event.target)) {
        setIsAdminMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "header",
      { className: "sticky top-0 z-10 w-full bg-[var(--bg-primary)]/80 backdrop-blur-md shadow-md print:hidden" },
      React.createElement(
        "div",
        { className: "container mx-auto max-w-4xl flex items-center justify-between p-4" },
        React.createElement(
          "div",
          { className: "flex items-center space-x-4" },
          showBackButton ? React.createElement(
            "button",
            {
              onClick: onGoBack,
              className: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors h-10 w-10 flex items-center justify-center bg-[var(--bg-secondary)] rounded-lg",
              "aria-label": getML({ vi: 'Quay lại', en: 'Go back' })
            },
            React.createElement("i", { className: "fas fa-arrow-left" })
          ) : React.createElement("div", { className: "w-10 h-10" }), // Placeholder
          React.createElement(
            "div",
            { onClick: onTitleClick, className: "flex items-center space-x-3 cursor-pointer" },
            logoUrl && React.createElement("img", { src: logoUrl, alt: "Logo", className: "h-10 w-10 object-contain" }),
            React.createElement(
              "div",
              null,
              React.createElement("h1", { className: "text-xl font-bold text-[var(--text-accent)]" }, getML(title)),
              React.createElement("p", { className: "text-xs text-[var(--text-secondary)] hidden sm:block" }, getML(subtitle))
            )
          )
        ),
        React.createElement(
          "nav",
          { className: "hidden md:flex items-center space-x-2" },
          React.createElement(
            "div",
            { className: "relative" },
            React.createElement(
              "button",
              { ref: langButtonRef, onClick: () => setIsLangMenuOpen(!isLangMenuOpen), className: "menu-btn", "aria-label": getML({ vi: "Đổi ngôn ngữ", en: "Change language" }) },
              React.createElement("i", { className: "fas fa-language text-lg" })
            ),
            isLangMenuOpen && React.createElement(
              "div",
              { ref: langMenuRef, className: "absolute right-0 mt-2 w-40 bg-[var(--bg-secondary)] rounded-lg shadow-xl py-1" },
              languages.map(lang => React.createElement(
                "a",
                {
                  key: lang.code,
                  href: "#",
                  onClick: (e) => { e.preventDefault(); onLanguageChange(lang.code); setIsLangMenuOpen(false); },
                  className: `block px-4 py-2 text-sm ${currentLanguage === lang.code ? 'font-bold text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'} hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]`
                },
                lang.name
              ))
            )
          ),
          React.createElement(
            "button",
            { onClick: () => setShowThemeSwitcher(true), className: "menu-btn", "aria-label": getML({ vi: "Đổi giao diện", en: "Change theme" }) },
            React.createElement("i", { className: "fas fa-palette" })
          ),
          React.createElement(
            "button",
            { onClick: onAboutClick, className: "menu-btn", "aria-label": getML({ vi: "Về ứng dụng", en: "About the app" }) },
            React.createElement("i", { className: "fas fa-info-circle" })
          ),
          React.createElement(
            "div",
            { className: "relative" },
            React.createElement(
              "button",
              { ref: adminButtonRef, onClick: () => isAdmin ? setIsAdminMenuOpen(prev => !prev) : onAdminClick(), className: `menu-btn ${isAdmin ? 'text-[var(--text-accent)]' : ''}`, "aria-label": "Admin Menu" },
              React.createElement("i", { className: "fas fa-user-shield" })
            ),
            isAdmin && isAdminMenuOpen && React.createElement(
              "div",
              { ref: adminMenuRef, className: "absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] rounded-lg shadow-xl py-1 text-sm" },
              React.createElement(
                "a",
                {
                  href: "#",
                  onClick: (e) => { e.preventDefault(); onAdminClick(); setIsAdminMenuOpen(false); },
                  className: "flex items-center px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                },
                React.createElement("i", { className: "fas fa-cogs fa-fw mr-2" }), " ", getML({ vi: 'Bảng Điều Khiển', en: 'Admin Panel' })
              ),
              React.createElement(
                "a",
                {
                  href: "#",
                  onClick: (e) => { e.preventDefault(); onLogout(); setIsAdminMenuOpen(false); },
                  className: "flex items-center px-4 py-2 text-red-400 hover:bg-red-500/10"
                },
                React.createElement("i", { className: "fas fa-sign-out-alt fa-fw mr-2" }), " ", getML({ vi: 'Đăng Xuất', en: 'Logout' })
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "md:hidden" },
          React.createElement(
            "button",
            { ref: buttonRef, onClick: () => setIsMenuOpen(!isMenuOpen), className: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors h-10 w-10 flex items-center justify-center bg-[var(--bg-secondary)] rounded-lg", "aria-label": "Open menu" },
            React.createElement("i", { className: `fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}` })
          )
        )
      ),
      isMenuOpen && React.createElement(
        "div",
        { ref: menuRef, className: "md:hidden animate-fade-in-down bg-[var(--bg-secondary)] shadow-lg absolute top-full left-0 w-full" },
        React.createElement(
          "nav",
          { className: "flex flex-col p-4 space-y-2" },
          React.createElement(
            "div",
            { className: "mobile-menu-btn" },
            React.createElement("i", { className: "fas fa-language w-6" }),
            React.createElement(
              "select",
              { onChange: (e) => { onLanguageChange(e.target.value); setIsMenuOpen(false); }, value: currentLanguage, className: "bg-transparent w-full focus:outline-none" },
              languages.map(lang => React.createElement(
                "option",
                { key: lang.code, value: lang.code, className: "bg-[var(--bg-primary)] text-[var(--text-primary)]" },
                lang.name
              ))
            )
          ),
          React.createElement(
            "button",
            { onClick: () => { setShowThemeSwitcher(true); setIsMenuOpen(false); }, className: "mobile-menu-btn" },
            React.createElement("i", { className: "fas fa-palette w-6" }),
            React.createElement("span", null, getML({ vi: "Đổi Giao Diện", en: "Change Theme" }))
          ),
          React.createElement(
            "button",
            { onClick: () => { onAboutClick(); setIsMenuOpen(false); }, className: "mobile-menu-btn" },
            React.createElement("i", { className: "fas fa-info-circle w-6" }),
            React.createElement("span", null, getML({ vi: "Về Ứng Dụng", en: "About App" }))
          ),
          React.createElement(
            "button",
            { onClick: () => { onAdminClick(); setIsMenuOpen(false); }, className: `mobile-menu-btn ${isAdmin ? 'text-[var(--text-accent)]' : ''}` },
            React.createElement("i", { className: "fas fa-user-shield w-6" }),
            React.createElement("span", null, isAdmin ? getML({ vi: 'Bảng Điều Khiển', en: 'Admin Panel' }) : 'Admin')
          ),
          isAdmin && React.createElement(
            "button",
            { onClick: () => { onLogout(); setIsMenuOpen(false); }, className: "mobile-menu-btn text-red-400" },
            React.createElement("i", { className: "fas fa-sign-out-alt w-6" }),
            React.createElement("span", null, getML({ vi: 'Đăng Xuất', en: 'Logout' }))
          )
        )
      )
    ),
    showThemeSwitcher && React.createElement(ThemeSwitcher, { 
      currentTheme: currentTheme, 
      onThemeChange: onThemeChange,
      onClose: () => setShowThemeSwitcher(false) 
    }),
    React.createElement("style", null, `
        .menu-btn { display: flex; align-items: center; padding: 0.5rem; border-radius: 0.5rem; background-color: var(--bg-secondary); color: var(--text-secondary); transition: all 0.2s; }
        .menu-btn:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }
        .mobile-menu-btn { display: flex; align-items: center; padding: 0.75rem; border-radius: 0.5rem; text-align: left; font-weight: 600; color: var(--text-secondary); }
        .mobile-menu-btn:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
      `)
  );
};

// START OF FILE: components/Footer.tsx
const Footer = ({ content }) => {
  return React.createElement(
    "footer",
    { className: "w-full mt-auto py-4 bg-transparent print:hidden" },
    React.createElement(
      "div",
      { className: "text-center text-[var(--text-secondary)] text-sm px-4" },
      React.createElement("div", { dangerouslySetInnerHTML: { __html: content } })
    )
  );
};

// START OF FILE: components/Pagination.tsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - halfPagesToShow);
      let endPage = Math.min(totalPages, currentPage + halfPagesToShow);

      if (currentPage <= halfPagesToShow) {
        endPage = maxPagesToShow;
      }

      if (currentPage + halfPagesToShow >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
      }
      
      if (startPage > 1) {
          pageNumbers.push(1);
          if (startPage > 2) pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
          if (endPage < totalPages - 1) pageNumbers.push('...');
          pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return React.createElement(
    "div",
    { className: "flex items-center justify-center space-x-2 my-8" },
    React.createElement(
      "button",
      {
        onClick: handlePrev,
        disabled: currentPage === 1,
        className: "h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] transition-colors",
        "aria-label": "Previous Page"
      },
      React.createElement("i", { className: "fas fa-chevron-left" })
    ),
    getPageNumbers().map((page, index) =>
      typeof page === 'number' ? React.createElement(
        "button",
        {
          key: index,
          onClick: () => onPageChange(page),
          className: `h-10 w-10 flex items-center justify-center rounded-lg transition-colors font-semibold ${
            currentPage === page
              ? 'bg-[var(--text-accent)] text-[var(--bg-primary)] shadow-md'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
          }`
        },
        page
      ) : React.createElement(
        "span",
        { key: index, className: "h-10 w-10 flex items-center justify-center text-[var(--text-secondary)]" },
        page
      )
    ),
    React.createElement(
      "button",
      {
        onClick: handleNext,
        disabled: currentPage === totalPages,
        className: "h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] transition-colors",
        "aria-label": "Next Page"
      },
      React.createElement("i", { className: "fas fa-chevron-right" })
    )
  );
};


// START OF FILE: components/FeastList.tsx
const FEASTS_PER_PAGE = 13;

const FeastList = ({ feasts, onSelectFeast, feastTypes, getML, mainSections, onSelectMainSection, isAdmin, onAddNewFeast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const languageCodeForDate = getML({vi: 'vi-VN', en: 'en-US'});

  const formatToMMDD = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  const todayString = useMemo(() => formatToMMDD(new Date()), []);
  const tomorrowString = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatToMMDD(tomorrow);
  }, []);

  const filteredFeasts = useMemo(() => {
    const feastsByType = selectedType === 'all' 
        ? feasts 
        : feasts.filter(feast => feast.type === selectedType);

    if (!searchTerm) return feastsByType;
    
    const lowercasedFilter = searchTerm.toLowerCase();
    return feastsByType.filter(feast => 
        Object.values(feast.title).some(t => typeof t === 'string' && t.toLowerCase().includes(lowercasedFilter)) ||
        (feast.subtitle && Object.values(feast.subtitle).some(s => typeof s === 'string' && s.toLowerCase().includes(lowercasedFilter)))
    );
  }, [feasts, searchTerm, selectedType]);

  useEffect(() => {
    if (searchTerm || selectedType !== 'all') {
      setCurrentPage(1);
      return;
    };
    
    let targetFeastIndex = -1;
    targetFeastIndex = filteredFeasts.findIndex(feast => feast.date === todayString);
    if (targetFeastIndex === -1) {
      targetFeastIndex = filteredFeasts.findIndex(feast => feast.date === tomorrowString);
    }
    if (targetFeastIndex === -1) {
      const nextUpcomingIndex = filteredFeasts.findIndex(feast => feast.date >= todayString);
      if (nextUpcomingIndex !== -1) {
        targetFeastIndex = nextUpcomingIndex;
      } else {
        if (filteredFeasts.length > 0) {
          targetFeastIndex = 0;
        }
      }
    }

    if (targetFeastIndex !== -1) {
      const pageOfTargetFeast = Math.floor(targetFeastIndex / FEASTS_PER_PAGE) + 1;
      setCurrentPage(pageOfTargetFeast);
    }
  }, []);

  const paginatedFeasts = useMemo(() => {
    const startIndex = (currentPage - 1) * FEASTS_PER_PAGE;
    return filteredFeasts.slice(startIndex, startIndex + FEASTS_PER_PAGE);
  }, [filteredFeasts, currentPage]);

  const totalPages = Math.ceil(filteredFeasts.length / FEASTS_PER_PAGE);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); 
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const getFilterButtonStyle = (isActive) => {
    const baseStyle = "flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]";
    if (isActive) {
      return `${baseStyle} bg-[var(--text-accent)] text-[var(--bg-primary)] shadow-md focus:ring-[var(--text-accent)]`;
    }
    return `${baseStyle} bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)]/50 focus:ring-[var(--border-accent)]`;
  };

  return React.createElement(
    "div",
    { className: "animate-fade-in" },
    React.createElement(
      "div",
      { className: "sticky top-[80px] z-20 bg-[var(--bg-primary)]/95 backdrop-blur-sm -mx-4 sm:mx-0 sm:rounded-xl shadow-lg mb-6" },
      React.createElement(
        "div",
        { className: "p-4 md:p-6 space-y-4" },
        React.createElement(
          "div",
          { className: "flex flex-col sm:flex-row items-center gap-4" },
          React.createElement(
            "div",
            { className: "relative flex-grow w-full" },
            React.createElement(
              "div",
              { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" },
              React.createElement("i", { className: "fas fa-search text-[var(--text-secondary)]" })
            ),
            React.createElement("input", {
              type: "text",
              placeholder: getML({ vi: "Tìm lễ...", en: "Search feasts..." }),
              value: searchTerm,
              onChange: handleSearchChange,
              className: "w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--bg-tertiary)] rounded-lg shadow-sm py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:border-[var(--border-accent)] transition-all duration-300",
              "aria-label": getML({ vi: "Tìm kiếm lễ", en: "Search for feasts" })
            })
          ),
          isAdmin && React.createElement(
            "button",
            {
              onClick: onAddNewFeast,
              className: "bg-blue-500/20 text-blue-300 px-4 py-3 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 font-semibold flex items-center flex-shrink-0 w-full justify-center sm:w-auto"
            },
            React.createElement("i", { className: "fas fa-plus mr-2" }),
            React.createElement("span", null, getML({ vi: 'Thêm Lễ', en: 'Add Feast' }))
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "flex items-center space-x-3 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 filter-scrollbar-hide" },
            mainSections.map((section) => React.createElement(
              "button",
              {
                key: section.id,
                onClick: () => onSelectMainSection(section.id),
                className: `${getFilterButtonStyle(false)} flex items-center gap-2`
              },
              React.createElement("i", { className: `fas ${section.icon} text-sm text-[var(--text-accent)]` }),
              React.createElement("span", null, getML(section.title))
            )),
            mainSections.length > 0 && feasts.length > 0 && React.createElement("div", { className: "h-6 w-px bg-[var(--bg-tertiary)] flex-shrink-0" }),
            feasts.length > 0 && React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "button",
                { onClick: () => handleTypeSelect('all'), className: getFilterButtonStyle(selectedType === 'all') },
                getML({ vi: 'Tất cả', en: 'All' })
              ),
              feastTypes.map(type => React.createElement(
                "button",
                { key: type.name.vi, onClick: () => handleTypeSelect(type.name.vi), className: getFilterButtonStyle(selectedType === type.name.vi) },
                getML(type.name)
              ))
            )
          )
        )
      )
    ),
    paginatedFeasts.length > 0 ? React.createElement(
      "div",
      { className: "space-y-3" },
      paginatedFeasts.map((feast, index) => {
        const isToday = feast.date === todayString;
        const isTomorrow = feast.date === tomorrowString;
        const feastTypeData = feastTypes.find(ft => ft.name.vi === feast.type);
        return React.createElement(
          "div",
          {
            key: feast.id,
            onClick: () => onSelectFeast(feast),
            className: "group animate-list-item bg-[var(--bg-secondary)] rounded-lg p-4 flex items-center space-x-4 transition-all duration-300 border border-[var(--bg-tertiary)] hover:border-[var(--border-accent)] hover:shadow-lg hover:shadow-[var(--border-accent)]/20 cursor-pointer transform hover:-translate-y-1",
            role: "button",
            "aria-label": `${getML({ vi: 'Chọn', en: 'Select' })} ${getML(feast.title)}`,
            style: { animationDelay: `${index * 50}ms` }
          },
          React.createElement(
            "div",
            { className: "flex-shrink-0 w-16 h-16 rounded-lg bg-[var(--bg-tertiary)] flex flex-col items-center justify-center text-center transition-colors duration-300 group-hover:bg-[var(--highlight-bg)]" },
            React.createElement("p", { className: "text-2xl font-bold text-[var(--text-accent)]" }, feast.date.split('-')[1]),
            React.createElement("p", { className: "text-xs font-semibold text-[var(--text-secondary)] uppercase" }, new Date(2000, parseInt(feast.date.split('-')[0]) - 1, 1).toLocaleString(languageCodeForDate, { month: 'short' }))
          ),
          React.createElement(
            "div",
            { className: "flex-grow" },
            React.createElement("h3", { className: "text-lg font-bold text-[var(--text-primary)]" }, getML(feast.title)),
            feast.subtitle && getML(feast.subtitle) && React.createElement("p", { className: "text-sm text-[var(--text-secondary)] italic" }, getML(feast.subtitle)),
            React.createElement(
              "div",
              { className: "flex items-center flex-wrap gap-2 mt-2" },
              isToday && React.createElement(
                "span",
                { className: "text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/80 border border-red-400 text-white animate-pulse" },
                getML({ vi: 'HÔM NAY', en: 'TODAY' })
              ),
              isTomorrow && React.createElement(
                "span",
                { className: "text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/80 border border-amber-400 text-white" },
                getML({ vi: 'NGÀY MAI', en: 'TOMORROW' })
              ),
              feastTypeData && React.createElement(
                "span",
                { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--text-accent)]/10 text-[var(--text-accent)]" },
                getML(feastTypeData.name)
              )
            )
          ),
          React.createElement(
            "div",
            { className: "flex-shrink-0 self-center" },
            React.createElement("i", { className: "fas fa-chevron-right text-[var(--text-secondary)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--text-accent)]" })
          )
        );
      })
    ) : React.createElement(
      "div",
      { className: "text-center py-12" },
      React.createElement("i", { className: "fas fa-calendar-times fa-3x text-[var(--text-secondary)] mb-4" }),
      React.createElement(
        "p",
        { className: "text-[var(--text-secondary)]" },
        feasts.length > 0
          ? getML({ vi: 'Không tìm thấy lễ nào phù hợp.', en: 'No matching feasts found.' })
          : getML({ vi: 'Chưa có ngày lễ nào được thêm vào.', en: 'No feasts have been added yet.' })
      )
    ),
    totalPages > 1 && React.createElement(Pagination, { 
      currentPage: currentPage,
      totalPages: totalPages,
      onPageChange: handlePageChange
    }),
    React.createElement("style", null, `
            .filter-scrollbar-hide::-webkit-scrollbar { display: none; }
            .filter-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-list-item {
              opacity: 0;
              animation: fade-in-up 0.5s ease-out forwards;
              animation-fill-mode: forwards;
            }
      `)
  );
};


// START OF FILE: components/FeastDetail.tsx
const FeastDetail = ({ feast, onSelectSection, isAdmin, onEditFeast, onDeleteFeast, getML, getSectionTitle, sectionsConfig }) => {
  return React.createElement(
    "div",
    { className: "animate-fade-in space-y-6" },
    React.createElement(
      "div",
      { className: "text-center border-b border-[var(--bg-tertiary)] pb-4" },
      React.createElement("h2", { className: "text-3xl font-bold text-[var(--text-accent)]" }, getML(feast.title)),
      feast.subtitle && getML(feast.subtitle) && React.createElement("p", { className: "text-[var(--text-secondary)] mt-1" }, getML(feast.subtitle)),
      isAdmin && React.createElement(
        "div",
        { className: "mt-4 flex justify-center space-x-4" },
        React.createElement(
          "button",
          { 
            onClick: onEditFeast,
            className: "bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 font-semibold flex items-center"
          },
          React.createElement("i", { className: "fas fa-edit mr-2" }),
          getML({ vi: 'Sửa', en: 'Edit' })
        ),
        React.createElement(
          "button",
          { 
            onClick: onDeleteFeast,
            className: "bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-300 font-semibold flex items-center"
          },
          React.createElement("i", { className: "fas fa-trash-alt mr-2" }),
          getML({ vi: 'Xóa', en: 'Delete' })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" },
      sectionsConfig.map(({ key, icon }) => {
        const sectionTitle = getML(getSectionTitle(key));
        const hasContent = feast.sections[key] && getML(feast.sections[key] || '').trim() !== '' && getML(feast.sections[key] || '').trim() !== getML(placeholder).trim();

        return React.createElement(
          "button",
          {
            key: key,
            onClick: () => onSelectSection(key),
            disabled: !hasContent,
            className: "bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg hover:bg-[var(--bg-tertiary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center text-center space-y-2"
          },
          React.createElement("i", { className: `fas ${icon} text-3xl text-[var(--text-accent)]` }),
          React.createElement("span", { className: "text-lg font-semibold text-[var(--text-primary)]" }, sectionTitle)
        );
      })
    )
  );
};
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


// START OF FILE: components/SectionView.tsx
const SectionView = ({
  feastTitle,
  sectionTitle,
  content,
  isAdmin,
  onEdit,
  getML,
  fontSize,
  onFontSizeChange,
  onNavigateSection,
  canNavigatePrev,
  canNavigateNext,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return React.createElement(
    "div",
    { className: "bg-[var(--bg-secondary)] p-6 rounded-lg shadow-2xl animate-fade-in" },
    React.createElement(
      "div",
      { className: "flex justify-end items-center mb-4 print:hidden" },
      React.createElement(
        "div",
        { className: "flex items-center gap-1 bg-[var(--bg-tertiary)] p-1 rounded-full shadow-inner" },
        React.createElement(
          "button",
          { 
            onClick: () => onFontSizeChange(fontSize - 1), 
            disabled: fontSize <= 12, 
            className: "toolbar-btn", 
            "aria-label": getML({ vi: "Giảm cỡ chữ", en: "Decrease font size" }),
            title: getML({ vi: "Giảm cỡ chữ", en: "Decrease font size" })
          },
          React.createElement("i", { className: "fas fa-minus text-xs" })
        ),
        React.createElement("span", { className: "text-sm font-semibold w-8 text-center text-[var(--text-secondary)] select-none" }, fontSize),
        React.createElement(
          "button",
          { 
            onClick: () => onFontSizeChange(fontSize + 1), 
            disabled: fontSize >= 28, 
            className: "toolbar-btn", 
            "aria-label": getML({ vi: "Tăng cỡ chữ", en: "Increase font size", es: "Aumentar el tamaño de la fuente", fr: "Augmenter la taille de la police", la: "Augere magnitudinem litterarum" }),
            title: getML({ vi: "Tăng cỡ chữ", en: "Increase font size", es: "Aumentar el tamaño de la fuente", fr: "Augmenter la taille de la police", la: "Augere magnitudinem litterarum"  })
          },
          React.createElement("i", { className: "fas fa-plus text-xs" })
        ),
        React.createElement("div", { className: "w-px h-5 bg-[var(--bg-primary)]/50 mx-1" }),
        isAdmin && React.createElement(
          "button",
          {
            onClick: onEdit,
            className: "toolbar-btn hover:text-blue-400",
            "aria-label": getML({ vi: "Sửa mục này", en: "Edit this section" }),
            title: getML({ vi: "Sửa mục này", en: "Edit this section" })
          },
          React.createElement("i", { className: "fas fa-pencil-alt text-sm" })
        ),
        React.createElement(
          "button",
          {
            onClick: handlePrint,
            className: "toolbar-btn hover:text-[var(--text-accent)]",
            "aria-label": getML({ vi: "In", en: "Print" }),
            title: getML({ vi: "In", en: "Print" })
          },
          React.createElement("i", { className: "fas fa-print text-sm" })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mb-6 border-b border-[var(--bg-tertiary)] pb-4 text-center" },
      React.createElement("h2", { className: "text-2xl font-bold text-[var(--text-accent)]" }, sectionTitle),
      React.createElement("p", { className: "text-md text-[var(--text-secondary)] mt-1" }, feastTitle)
    ),
    React.createElement(
      "div",
      { id: "print-content" },
      React.createElement("div", {
        className: "prose prose-sm md:prose-base prose-invert max-w-none text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap",
        dangerouslySetInnerHTML: {
          __html: content.replace(/<strong/g, '<strong class="text-[var(--text-accent)]"'),
        },
        style: { fontSize: `${fontSize}px`, color: 'var(--text-primary)' }
      })
    ),
    React.createElement(
      "div",
      { className: "mt-8 pt-4 border-t border-[var(--bg-tertiary)] flex justify-between items-center print:hidden" },
      React.createElement(
        "button",
        {
          onClick: () => onNavigateSection('prev'),
          disabled: !canNavigatePrev,
          className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        },
        React.createElement("i", { className: "fas fa-arrow-left" }),
        React.createElement("span", null, getML({ vi: 'Mục Trước', en: 'Previous' }))
      ),
      React.createElement(
        "button",
        {
          onClick: () => onNavigateSection('next'),
          disabled: !canNavigateNext,
          className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        },
        React.createElement("span", null, getML({ vi: 'Mục Kế', en: 'Next' })),
        React.createElement("i", { className: "fas fa-arrow-right" })
      )
    ),
    React.createElement("style", null, `
        .toolbar-btn {
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
        }
        .toolbar-btn:hover:not(:disabled) {
          background-color: var(--bg-secondary);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }
        .toolbar-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
       `)
  );
};


// START OF FILE: components/PrayerList.tsx
const ITEMS_PER_PAGE = 15;

const GenericContentList = ({ items, onSelectItem, getML, isAdmin, onAddNew, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const lowercasedFilter = searchTerm.toLowerCase();
    return items.filter(item => 
        Object.values(item.title).some(t => typeof t === 'string' && t.toLowerCase().includes(lowercasedFilter))
    );
  }, [items, searchTerm]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return React.createElement(
    "div",
    { className: "animate-fade-in" },
    React.createElement(
      "div",
      { className: "text-center mb-6" },
      React.createElement("h2", { className: "text-3xl font-bold text-[var(--text-accent)]" }, getML(title)),
      React.createElement(
        "div",
        { className: "mt-4 flex justify-center items-center space-x-4" },
        isAdmin && React.createElement(
          "button",
          {
            onClick: onAddNew,
            className: "bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 font-semibold flex items-center"
          },
          React.createElement("i", { className: "fas fa-plus-circle mr-2" }),
          getML({ vi: 'Thêm Mục Mới', en: 'Add New Item' })
        )
      )
    ),
    items.length > 0 && React.createElement(
      "div",
      { className: "sticky top-[80px] z-[5] bg-[var(--bg-primary)] py-4 mb-6 -mx-4 px-4" },
      React.createElement(
        "div",
        { className: "relative" },
        React.createElement(
          "div",
          { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" },
          React.createElement("i", { className: "fas fa-search text-[var(--text-secondary)]" })
        ),
        React.createElement("input", {
          type: "text",
          placeholder: getML({ vi: "Tìm kiếm...", en: "Search items..." }),
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--bg-tertiary)] rounded-lg shadow-sm py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:border-[var(--border-accent)] transition-all duration-300",
          "aria-label": getML({ vi: "Tìm kiếm", en: "Search" })
        })
      )
    ),
    paginatedItems.length > 0 ? React.createElement(
      "div",
      { className: "space-y-3" },
      paginatedItems.map((item) => React.createElement(
        "div",
        {
          key: item.id,
          onClick: () => onSelectItem(item),
          className: "p-4 rounded-lg shadow-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer flex items-center justify-between",
          role: "button",
          "aria-label": `${getML({ vi: 'Chọn', en: 'Select' })} ${getML(item.title)}`
        },
        React.createElement("h3", { className: "text-lg font-semibold text-[var(--text-primary)]" }, getML(item.title)),
        React.createElement("i", { className: "fas fa-chevron-right text-gray-500" })
      ))
    ) : React.createElement(
      "div",
      { className: "text-center py-12" },
      React.createElement("i", { className: "fas fa-folder-open fa-3x text-[var(--text-secondary)] mb-4" }),
      React.createElement(
        "p",
        { className: "text-[var(--text-secondary)]" },
        items.length > 0
          ? getML({ vi: 'Không tìm thấy mục nào phù hợp.', en: 'No matching items found.' })
          : getML({ vi: 'Chưa có mục nào được thêm vào.', en: 'No items have been added yet.' })
      )
    ),
    totalPages > 1 && React.createElement(Pagination, { 
      currentPage: currentPage,
      totalPages: totalPages,
      onPageChange: handlePageChange
    })
  );
};


// START OF FILE: components/PrayerDetail.tsx
const GenericContentDetail = ({
  item,
  isAdmin,
  onEdit,
  onDelete,
  getML,
  fontSize,
  onFontSizeChange,
  onNavigateItem,
  canNavigatePrev,
  canNavigateNext,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return React.createElement(
    "div",
    { className: "bg-[var(--bg-secondary)] p-6 rounded-lg shadow-2xl animate-fade-in" },
    React.createElement(
      "div",
      { className: "flex justify-end items-center mb-4 print:hidden" },
      React.createElement(
        "div",
        { className: "flex items-center gap-1 bg-[var(--bg-tertiary)] p-1 rounded-full shadow-inner" },
        React.createElement(
          "button",
          { 
            onClick: () => onFontSizeChange(fontSize - 1), 
            disabled: fontSize <= 12, 
            className: "toolbar-btn", 
            "aria-label": getML({ vi: "Giảm cỡ chữ", en: "Decrease font size" }),
            title: getML({ vi: "Giảm cỡ chữ", en: "Decrease font size" })
          },
          React.createElement("i", { className: "fas fa-minus text-xs" })
        ),
        React.createElement("span", { className: "text-sm font-semibold w-8 text-center text-[var(--text-secondary)] select-none" }, fontSize),
        React.createElement(
          "button",
          { 
            onClick: () => onFontSizeChange(fontSize + 1), 
            disabled: fontSize >= 28, 
            className: "toolbar-btn", 
            "aria-label": getML({ vi: "Tăng cỡ chữ", en: "Increase font size" }),
            title: getML({ vi: "Tăng cỡ chữ", en: "Increase font size" })
          },
          React.createElement("i", { className: "fas fa-plus text-xs" })
        ),
        React.createElement("div", { className: "w-px h-5 bg-[var(--bg-primary)]/50 mx-1" }),
        isAdmin && React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "button",
            {
              onClick: onEdit,
              className: "toolbar-btn hover:text-blue-400",
              "aria-label": getML({ vi: "Sửa mục này", en: "Edit this item" }),
              title: getML({ vi: "Sửa mục này", en: "Edit this item" })
            },
            React.createElement("i", { className: "fas fa-pencil-alt text-sm" })
          ),
          React.createElement(
            "button",
            { 
              onClick: onDelete,
              className: "toolbar-btn hover:text-red-400",
              "aria-label": getML({ vi: "Xóa mục này", en: "Delete this item" }),
              title: getML({ vi: "Xóa mục này", en: "Delete this item" })
            },
            React.createElement("i", { className: "fas fa-trash-alt text-sm" })
          )
        ),
        React.createElement(
          "button",
          {
            onClick: handlePrint,
            className: "toolbar-btn hover:text-[var(--text-accent)]",
            "aria-label": getML({ vi: "In", en: "Print" }),
            title: getML({ vi: "In", en: "Print" })
          },
          React.createElement("i", { className: "fas fa-print text-sm" })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mb-6 border-b border-[var(--bg-tertiary)] pb-4" },
      React.createElement("h2", { className: "text-2xl font-bold text-[var(--text-accent)] text-center" }, getML(item.title))
    ),
    React.createElement(
      "div",
      { id: "print-content" },
      React.createElement("div", {
        className: "prose prose-sm md:prose-base prose-invert max-w-none text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap",
        dangerouslySetInnerHTML: {
          __html: getML(item.content).replace(/<strong/g, '<strong class="text-[var(--text-accent)]"'),
        },
        style: { fontSize: `${fontSize}px`, color: 'var(--text-primary)' }
      })
    ),
    React.createElement(
      "div",
      { className: "mt-8 pt-4 border-t border-[var(--bg-tertiary)] flex justify-between items-center print:hidden" },
      React.createElement(
        "button",
        {
          onClick: () => onNavigateItem('prev'),
          disabled: !canNavigatePrev,
          className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        },
        React.createElement("i", { className: "fas fa-arrow-left" }),
        React.createElement("span", null, getML({ vi: 'Mục Trước', en: 'Previous' }))
      ),
      React.createElement(
        "button",
        {
          onClick: () => onNavigateItem('next'),
          disabled: !canNavigateNext,
          className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        },
        React.createElement("span", null, getML({ vi: 'Mục Kế', en: 'Next' })),
        React.createElement("i", { className: "fas fa-arrow-right" })
      )
    ),
    React.createElement("style", null, `
        .toolbar-btn {
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
        }
        .toolbar-btn:hover:not(:disabled) {
          background-color: var(--bg-secondary);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }
        .toolbar-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
       `)
  );
};


// START OF FILE: components/AboutPage.tsx
const AboutPage = ({ onGoBack, language, defaultLanguage, content }) => {
  const getML = (textObj) => getMultilingualText(textObj, language, defaultLanguage);

  return React.createElement(
    "div",
    { className: "bg-[var(--bg-secondary)] p-6 rounded-lg shadow-2xl animate-fade-in" },
    React.createElement(
      "div",
      { className: "flex justify-between items-center mb-6 border-b border-[var(--bg-tertiary)] pb-4" },
      React.createElement("h2", { className: "text-2xl font-bold text-[var(--text-accent)]" }, getML(content.title)),
      React.createElement(
        "button",
        { onClick: onGoBack, className: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors" },
        "×"
      )
    ),
    React.createElement(
      "div",
      { className: "prose prose-sm md:prose-base prose-invert max-w-none text-[var(--text-primary)] leading-relaxed space-y-4" },
      React.createElement("p", { dangerouslySetInnerHTML: { __html: getML(content.p1) } }),
      React.createElement("p", null, getML(content.p2_title)),
      React.createElement(
        "ul",
        null,
        React.createElement("li", null, getML(content.li1)),
        React.createElement("li", null, getML(content.li2)),
        React.createElement("li", null, getML(content.li3)),
        React.createElement("li", null, getML(content.li4))
      ),
      React.createElement("p", null, getML(content.p3)),
      React.createElement("p", null, getML(content.p4))
    ),
    React.createElement(
      "div",
      { className: "mt-8 pt-4 border-t border-[var(--bg-tertiary)] flex justify-center" },
      React.createElement(
        "button",
        {
          onClick: onGoBack,
          className: "px-6 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        },
        getML(content.go_back)
      )
    )
  );
};


// START OF FILE: components/ScrollToTopButton.tsx
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return React.createElement(
    "button",
    {
      type: "button",
      onClick: scrollToTop,
      className: `fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[var(--text-accent)] text-[var(--bg-primary)] shadow-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--text-accent)] focus:ring-offset-[var(--bg-primary)] transition-opacity duration-300 print:hidden ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`,
      "aria-label": "Go to top"
    },
    React.createElement("i", { className: "fas fa-arrow-up" })
  );
};

// START OF FILE: components/Modal.tsx
const Modal = ({ children, onClose, title, size = '2xl' }) => {
  const sizeClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden animate-fade-in",
      onClick: onClose
    },
    React.createElement(
      "div",
      {
        className: `relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`,
        onClick: (e) => e.stopPropagation()
      },
      React.createElement(
        "div",
        { className: "flex justify-between items-center p-4 border-b border-[var(--bg-tertiary)] flex-shrink-0" },
        React.createElement("h3", { className: "text-xl font-semibold text-[var(--text-accent)]" }, title),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10",
            "aria-label": "Close"
          },
          "×"
        )
      ),
      React.createElement(
        "div",
        { className: "p-6 overflow-y-auto" },
        children
      )
    )
  );
};

// START OF FILE: components/AdminLogin.tsx
const AdminLogin = ({ onClose, onLogin, adminPassword, getML }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === adminPassword) {
            onLogin();
        } else {
            setError(getML({ vi: 'Mật khẩu không đúng.', en: 'Incorrect password.'}));
            setPassword('');
        }
    };

    return React.createElement(
        Modal,
        { onClose: onClose, title: getML({ vi: "Đăng nhập Admin", en: "Admin Login" }), size: 'sm' },
        React.createElement(
            "form",
            { onSubmit: handleSubmit, className: "space-y-4" },
            React.createElement(
                "div",
                null,
                React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-[var(--text-secondary)] mb-1" }, getML({ vi: "Mật khẩu", en: "Password" })),
                React.createElement("input", {
                    ref: inputRef,
                    type: "password",
                    id: "password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]",
                })
            ),
            error && React.createElement("p", { className: "text-red-400 text-sm" }, error),
            React.createElement(
                "div",
                { className: "flex justify-end pt-4" },
                React.createElement(
                    "button",
                    { type: "submit", className: "px-4 py-2 bg-[var(--text-accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-opacity" },
                    getML({ vi: "Đăng nhập", en: "Login" })
                )
            )
        )
    );
};

// START OF FILE: components/SimpleRichTextEditor.tsx
const SimpleRichTextEditor = ({ value, onChange, height = 200 }) => {
  const textareaRef = useRef(null);

  const applyTag = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let newText;

    if (tag === 'br') {
        newText = `${value.substring(0, start)}<br/>${value.substring(end)}`;
    } else {
        newText = `${value.substring(0, start)}<${tag}>${selectedText}</${tag}>${value.substring(end)}`;
    }
    
    onChange(newText);
    
    setTimeout(() => {
        textarea.focus();
        if (tag !== 'br') {
          textarea.setSelectionRange(start + tag.length + 2, end + tag.length + 2);
        } else {
          textarea.setSelectionRange(start + 5, start + 5);
        }
    }, 0);
  };

  const buttons = [
    { tag: 'strong', icon: 'fa-bold', label: 'Bold' },
    { tag: 'em', icon: 'fa-italic', label: 'Italic' },
    { tag: 'p', icon: 'fa-paragraph', label: 'Paragraph' },
    { tag: 'br', icon: 'fa-level-down-alt', label: 'Line Break', transform: 'rotate-90' },
  ];

  return React.createElement(
    "div",
    { className: "relative" },
    React.createElement(
      "div",
      { className: "flex items-center space-x-2 p-2 bg-[var(--bg-tertiary)] rounded-t-md border-b border-[var(--bg-primary)]" },
      buttons.map(btn => React.createElement(
        "button",
        { 
          key: btn.tag, 
          type: "button",
          onClick: () => applyTag(btn.tag),
          className: "h-8 w-8 flex items-center justify-center rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-colors",
          title: btn.label
        },
        React.createElement("i", { className: `fas ${btn.icon}`, style: { transform: btn.transform || 'none'} })
      ))
    ),
    React.createElement("textarea", {
      ref: textareaRef,
      value: value,
      onChange: (e) => onChange(e.target.value),
      className: "w-full p-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-b-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--border-accent)] font-mono text-sm",
      style: { height: `${height}px`, resize: 'vertical' }
    })
  );
};


// START OF FILE: components/MultilingualInput.tsx
const MultilingualInput = ({ label, values, onChange, languages, getML }) => {
    const [currentLang, setCurrentLang] = useState(languages[0]?.code || 'vi');

    return React.createElement(
        "div",
        null,
        React.createElement("label", { className: "block text-sm font-medium text-[var(--text-secondary)] mb-2" }, label),
        React.createElement(
            "div",
            { className: "flex items-center space-x-1 mb-2 border-b border-[var(--bg-tertiary)] overflow-x-auto" },
            languages.filter(l=>l.enabled).map(lang => React.createElement(
                "button",
                {
                    key: lang.code,
                    type: "button",
                    onClick: () => setCurrentLang(lang.code),
                    className: `px-3 py-1 text-sm font-semibold rounded-t-md whitespace-nowrap ${currentLang === lang.code ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50'}`
                },
                lang.name
            ))
        ),
        React.createElement("input", {
            type: "text",
            value: values[currentLang] || '',
            onChange: e => onChange({ ...values, [currentLang]: e.target.value }),
            className: "w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]",
        })
    );
};

// START OF FILE: components/MultilingualTextEditor.tsx
const MultilingualTextEditor = ({ label, values, onChange, languages, getML, height }) => {
    const [currentLang, setCurrentLang] = useState(languages[0]?.code || 'vi');

    return React.createElement(
        "div",
        null,
        React.createElement("label", { className: "block text-sm font-medium text-[var(--text-secondary)] mb-2" }, label),
        React.createElement(
            "div",
            { className: "flex items-center space-x-1 mb-2 border-b border-[var(--bg-tertiary)] overflow-x-auto" },
            languages.filter(l=>l.enabled).map(lang => React.createElement(
                "button",
                {
                    key: lang.code,
                    type: "button",
                    onClick: () => setCurrentLang(lang.code),
                    className: `px-3 py-1 text-sm font-semibold rounded-t-md whitespace-nowrap ${currentLang === lang.code ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50'}`
                },
                lang.name
            ))
        ),
        React.createElement(SimpleRichTextEditor, {
            value: values[currentLang] || '',
            onChange: text => onChange({ ...values, [currentLang]: text }),
            height: height
        })
    );
};

// START OF FILE: components/EditFeastModal.tsx
const EditFeastModal = ({ feast, onSave, onClose, getML, languages, feastTypes, sectionsConfig }) => {
    const [editedFeast, setEditedFeast] = useState(feast || {
        id: '',
        date: '01-01',
        title: {},
        subtitle: {},
        type: feastTypes[0]?.name.vi || 'Lễ nhớ',
        sections: {}
    });

    const slugify = (text) => text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    const handleFieldChange = (field, value) => {
        setEditedFeast(prev => ({ ...prev, [field]: value }));
    };
    
    useEffect(() => {
        if (!feast) { // only for new feasts
            const newId = slugify(editedFeast.title.vi || editedFeast.title.en || `feast-${Date.now()}`);
            handleFieldChange('id', newId);
        }
    }, [editedFeast.title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalFeast = { ...editedFeast };
        if (!finalFeast.id) {
            finalFeast.id = slugify(finalFeast.title.vi || finalFeast.title.en || `feast-${Date.now()}`);
        }
        // Ensure all sections exist
        sectionsConfig.forEach(s => {
            if (!finalFeast.sections[s.key]) {
                finalFeast.sections[s.key] = placeholder;
            }
        });
        onSave(finalFeast);
    };

    return React.createElement(
        Modal,
        { onClose: onClose, title: getML(feast ? { vi: "Sửa Lễ", en: "Edit Feast" } : { vi: "Thêm Lễ Mới", en: "Add New Feast" }), size: "2xl" },
        React.createElement(
            "form",
            { onSubmit: handleSubmit, className: "space-y-4" },
            React.createElement(MultilingualInput, { label: getML({ vi: "Tiêu đề", en: "Title"}), values: editedFeast.title, onChange: val => handleFieldChange('title', val), languages, getML }),
            React.createElement(MultilingualInput, { label: getML({ vi: "Phụ đề", en: "Subtitle"}), values: editedFeast.subtitle, onChange: val => handleFieldChange('subtitle', val), languages, getML }),
            React.createElement(
                "div",
                { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                React.createElement(
                    "div",
                    null,
                    React.createElement("label", { htmlFor: "feast-id", className: "block text-sm font-medium text-[var(--text-secondary)] mb-1" }, getML({ vi: "ID", en: "ID" })),
                    React.createElement("input", { type: "text", id: "feast-id", value: editedFeast.id, onChange: e => handleFieldChange('id', e.target.value), className: "w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]" })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement("label", { htmlFor: "feast-date", className: "block text-sm font-medium text-[var(--text-secondary)] mb-1" }, getML({ vi: "Ngày (MM-DD)", en: "Date (MM-DD)" })),
                    React.createElement("input", { type: "text", id: "feast-date", pattern: "\\d{2}-\\d{2}", placeholder: "01-04", value: editedFeast.date, onChange: e => handleFieldChange('date', e.target.value), className: "w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]" })
                )
            ),
             React.createElement(
                "div",
                null,
                React.createElement("label", { htmlFor: "feast-type", className: "block text-sm font-medium text-[var(--text-secondary)] mb-1" }, getML({ vi: "Loại Lễ", en: "Feast Type" })),
                React.createElement(
                    "select",
                    { id: "feast-type", value: editedFeast.type, onChange: e => handleFieldChange('type', e.target.value), className: "w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]" },
                    feastTypes.map(type => React.createElement("option", { key: getML(type.name), value: type.name.vi }, getML(type.name)))
                )
            ),
            React.createElement(
                "div",
                { className: "flex justify-end pt-4" },
                React.createElement(
                    "button",
                    { type: "submit", className: "px-4 py-2 bg-[var(--text-accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-opacity" },
                    getML({ vi: "Lưu", en: "Save" })
                )
            )
        )
    );
};

// START OF FILE: components/EditSectionModal.tsx
const EditSectionModal = ({ sectionContent, sectionTitle, onSave, onClose, getML, languages }) => {
    const [content, setContent] = useState(sectionContent || {});

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(content);
    };

    return React.createElement(
        Modal,
        { onClose: onClose, title: `${getML({vi: "Sửa Mục", en: "Edit Section"})}: ${sectionTitle}`, size: '4xl'},
        React.createElement(
            "form",
            { onSubmit: handleSubmit, className: "space-y-4" },
            React.createElement(MultilingualTextEditor, {
                label: getML({vi: "Nội dung", en: "Content"}),
                values: content,
                onChange: setContent,
                languages,
                getML,
                height: 400
            }),
            React.createElement(
                "div",
                { className: "flex justify-end pt-4" },
                React.createElement(
                    "button",
                    { type: "submit", className: "px-4 py-2 bg-[var(--text-accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-opacity" },
                    getML({ vi: "Lưu", en: "Save" })
                )
            )
        )
    );
};

// START OF FILE: components/EditGenericContentModal.tsx
const EditGenericContentModal = ({ item, onSave, onClose, getML, languages }) => {
    const [editedItem, setEditedItem] = useState(item || { id: '', title: {}, content: {} });

    const slugify = (text) => text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    const handleFieldChange = (field, value) => {
        setEditedItem(prev => ({ ...prev, [field]: value }));
    };
    
    useEffect(() => {
        if (!item) { // only for new items
            const newId = slugify(editedItem.title.vi || editedItem.title.en || `item-${Date.now()}`);
            handleFieldChange('id', newId);
        }
    }, [editedItem.title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedItem);
    };

    return React.createElement(
        Modal,
        { onClose: onClose, title: getML(item ? { vi: "Sửa Mục", en: "Edit Item" } : { vi: "Thêm Mục Mới", en: "Add New Item" }), size: "4xl" },
        React.createElement(
            "form",
            { onSubmit: handleSubmit, className: "space-y-4" },
            React.createElement(MultilingualInput, { label: getML({ vi: "Tiêu đề", en: "Title"}), values: editedItem.title, onChange: val => handleFieldChange('title', val), languages, getML }),
            React.createElement(MultilingualTextEditor, { label: getML({ vi: "Nội dung", en: "Content"}), values: editedItem.content, onChange: val => handleFieldChange('content', val), languages, getML, height: 300 }),
            React.createElement(
                "div",
                { className: "flex justify-end pt-4" },
                React.createElement(
                    "button",
                    { type: "submit", className: "px-4 py-2 bg-[var(--text-accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-opacity" },
                    getML({ vi: "Lưu", en: "Save" })
                )
            )
        )
    );
};

// START OF FILE: components/AdminPanelModal.tsx
const AdminPanelModal = ({ settings, onSave, onClose, getML }) => {
    const [editedSettings, setEditedSettings] = useState(settings);

    const handleSave = () => {
        onSave(editedSettings);
        onClose();
    };
    
    const handleValueChange = (key, value) => {
        setEditedSettings(prev => ({...prev, [key]: value}));
    };
    
    return React.createElement(
      Modal,
      { onClose: onClose, title: getML({ vi: "Bảng Điều Khiển Admin", en: "Admin Panel" }), size: "4xl" },
      React.createElement(
        "div",
        { className: "space-y-6" },
        React.createElement("div", null, 
          React.createElement("h4", {className: "text-lg font-semibold mb-2 text-[var(--text-accent)]"}, "Ngôn Ngữ"),
          React.createElement(
            "div",
            {className: "space-y-2"},
            editedSettings.languages.map((lang, index) => React.createElement(
              "div", { key: lang.code, className: "flex items-center gap-4" },
              React.createElement("input", { type: "checkbox", checked: lang.enabled, onChange: e => {
                const newLangs = [...editedSettings.languages];
                newLangs[index].enabled = e.target.checked;
                handleValueChange('languages', newLangs);
              }, id: `lang-${lang.code}` }),
              React.createElement("label", { htmlFor: `lang-${lang.code}` }, lang.name)
            )),
             React.createElement("div", { className: "pt-2" },
                React.createElement("label", { htmlFor: "default-lang", className: "block text-sm font-medium text-[var(--text-secondary)] mb-1" }, "Ngôn ngữ mặc định"),
                 React.createElement("select", { id: "default-lang", value: editedSettings.defaultLanguage, onChange: e => handleValueChange('defaultLanguage', e.target.value), className: "w-full md:w-1/2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2" },
                    editedSettings.languages.filter(l=>l.enabled).map(lang => React.createElement("option", { key: lang.code, value: lang.code }, lang.name))
                )
            )
          )
        ),
        React.createElement("div", null, 
          React.createElement("h4", {className: "text-lg font-semibold mb-2 text-[var(--text-accent)]"}, "Bảo mật"),
          React.createElement("label", { htmlFor: "admin-pass", className: "block text-sm font-medium text-[var(--text-secondary)] mb-1" }, "Mật khẩu Admin mới"),
          React.createElement("input", { type: "password", id: "admin-pass", placeholder: "Để trống nếu không đổi", onChange: e => handleValueChange('adminPassword', e.target.value), className: "w-full md:w-1/2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--bg-primary)] rounded-lg p-2" })
        ),
         React.createElement(
            "div",
            { className: "flex justify-end pt-4" },
            React.createElement(
                "button",
                { type: "button", onClick: handleSave, className: "px-6 py-2 bg-[var(--text-accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-opacity" },
                getML({ vi: "Lưu Cài Đặt", en: "Save Settings" })
            )
        )
      )
    );
};

// START OF FILE: App.tsx
const DEFAULT_SETTINGS = {
    language: 'vi',
    languages: [
      { code: 'vi', name: 'Tiếng Việt', enabled: true },
      { code: 'en', name: 'English', enabled: true },
      { code: 'es', name: 'Español', enabled: true },
      { code: 'fr', name: 'Français', enabled: true },
      { code: 'la', name: 'Latina', enabled: true },
    ],
    defaultLanguage: 'vi',
    theme: 'light',
    fontSize: 16,
    adminPassword: 'admin123',
    footerContent: { 
        vi: 'Bản quyền thuộc Ban Truyền Thông. <br/> Tu Hội Truyền Giáo - Tỉnh dòng Việt nam © 2025.',
        en: 'Content provided for liturgical and study purposes. <br/> All rights reserved © 2025.' 
    },
    feastTypes: [
        { name: { vi: 'Đại lễ', en: 'Solemnity', es:'Solemnidad', fr: 'Solennité', la: 'Sollemnitas' } },
        { name: { vi: 'Lễ kính', en: 'Feast' , es:'Fiesta', fr: 'Fête', la: 'Festum'} },
        { name: { vi: 'Lễ nhớ', en: 'Memorial' , es:'Memoria', fr: 'Mémoire', la: 'Memoria'} },
        { name: { vi: 'Kỷ niệm', en: 'Commemoration', es:'Conmemoración', fr: 'Commémoration', la: 'Commemoratio' } },
    ],
    mainSectionContents: {
        prayers: [
           { id: 'laycha', title: { vi: 'Kinh Lạy Cha', en: 'Our Father', es: 'Padre Nuestro', fr: 'Notre Père', la: 'Pater Noster'}, 
           content: { 
            vi: 'Lạy Cha chúng con ở trên trời, chúng con nguyện danh Cha cả sáng, nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời. Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con như chúng con cũng tha kẻ có nợ chúng con. Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi mọi sự dữ. Amen.', 
            en: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come, Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation,but deliver us from evil. Amen.', 
          
            es: 'Padre nuestro que estás en los cielos, santificado sea tu nombre; venga tu reino; hágase tu voluntad, así en la tierra como en el cielo. Danos hoy nuestro pan de cada día; y perdona nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del mal. Amén.',
          
            fr: 'Notre Père qui es aux cieux, que ton nom soit sanctifié; que ton règne vienne; que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd\'hui notre pain de ce jour; pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés; et ne nous soumets pas à la tentation, mais délivre-nous du mal. Amen.',
          
            la: 'Pater noster, qui es in caelis, sanctificetur nomen tuum; adveniat regnum tuum; fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie; et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris; et ne nos inducas in tentationem, sed libera nos a malo. Amen.'
           }},

           { id: 'kinhmung', title: { 
            vi: 'Kinh Kính Mừng', 
            en: 'Hail Mary', 
            es: 'Dios te salve María', 
            fr: 'Je vous salue Marie', 
            la: 'Ave Maria'}, 
           content: { 

            vi: 'Kính mừng Maria đầy ơn phước, Đức Chúa Trời ở cùng Bà, Bà có phước lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phước lạ. Thánh Maria Đức Mẹ Chúa Trời, cầu cho chúng con là kẻ có tội, khi này và trong giờ lâm tử. Amen.', 
            en: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
            es: 'Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.',
            fr: 'e vous salue, Marie, pleine de grâce ; le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant et à lheure de notre mort. Amen.',
            la: 'Áve María, grátia pléna, Dóminus técum. Benedícta tu in muliéribus, et benedíctus frúctus véntris túi, Iésus. Sáncta María, Máter Déi, óra pro nóbis peccatóribus, nunc et in hóra mórtis nóstræ. Ámen.'
          
          }},
          { id: 'sangdanh', title: { 
            vi: 'Sáng Danh', 
            en: 'Glory Be', 
            es: 'Gloria', 
            fr: 'Gloire au Père', 
            la: 'Gloria Patri'}, 
           content: { 

            vi: 'Sáng danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần. Như đã có trước vô cùng, và bây giờ, và hằng có, và đời đời chẳng cùng. Amen.', 
            en: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.', 
            es: 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.',
            fr: 'Gloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen.',
            la: 'Glória Pátri, et Fílio, et Spirítui Sáncto. Sicut érat in princípio, et nunc et sémper, et in sǽcula sæculórum. Ámen.'
          }},
           { id: 'kinhtinkinh', title: { 
            vi: 'Kinh Tin Kính', 
            en: 'Apostles Creed', 
            es: 'Credo de los Apóstoles', 
            fr: 'Symbole des Apôtres', 
            la: 'Symbolum Apostolorum)'}, 
           content: { 

            vi: 'Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất. Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha, cùng là Chúa chúng tôi. Bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh, chịu nạn đời quan Phongxiô Philatô, chịu đóng đanh trên cây Thánh giá, chết và táng xác, xuống ngục tổ tông, ngày thứ ba bởi trong kẻ chết mà sống lại, lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng. Ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết. Tôi tin kính Đức Chúa Thánh Thần. Tôi tin có Hội Thánh hằng có ở khắp thế này, các Thánh thông công. Tôi tin phép tha tội. Tôi tin xác loài người ngày sau sống lại. Tôi tin hằng sống vậy. Amen.', 
            en: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.', 
            es: 'Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.',
            fr: 'Je crois en Dieu, le Père tout-puissant, Créateur du ciel et de la terre. Et en Jésus Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers, le troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d’où il viendra juger les vivants et les morts. Je crois au Saint-Esprit, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Amen.',
            la: 'Crédo in Déum Pátrem omnipoténtem, Creatórem cæli et térræ. Et in Iésum Chrístum, Fílium éius unícum, Dóminum nóstrum: qui concéptus est de Spíritu Sáncto, nátus ex María Vírgine, pássus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus: descéndit ad ínferos: tértia díe resurréxit a mórtuis: ascéndit ad cælos: sédet ad déxteram Déi Pátris omnipoténtis: índe ventúrus est iudicáre vívos et mórtuos. Crédo in Spíritum Sánctum, sánctam Ecclésiam cathólicam, Sanctórum communiónem, remissiónem peccatórum, cárnis resurrectiónem, vítam ætérnam. Ámen.'
          }},
           { id: 'kinhlaynuvuong', title: { 
            vi: 'Kinh Lạy Nữ Vương', 
            en: 'Hail Holy Queen', 
            es: 'Salve Regina', 
            fr: 'Salut, Ô Reine', 
            la: 'Salve Regina'}, 
           content: { 

            vi: 'Lạy Nữ Vương, Mẹ nhân lành, làm cho chúng con được sống, được vui, được cậy. Thân lạy Mẹ, chúng con, con cháu Evà ở chốn khách đầy, kêu đến cùng Bà. Chúng con ở nơi khóc lóc, than thở, kêu khẩn Bà thương. Hỡi ôi! Bà là Nữ Bào Chữa chúng con, xin ghé mắt thương xem chúng con. Đến sau khỏi đày, xin cho chúng con được thấy Đức Chúa Giêsu, Con lòng Bà gồm phước lạ. Ôi khoan thay! Nhân thay! Dịu thay! Thánh Maria trọn đời đồng trinh. Amen.', 
            en: 'Hail, holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.', 
            es: 'Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra. Dios te salve. A ti llamamos los desterrados hijos de Eva. A ti suspiramos, gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos. Y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clemente, oh piadosa, oh dulce Virgen María!',
            fr: 'Salut, ô Reine, Mère de miséricorde, notre vie, notre douceur et notre espérance, salut. Enfants dÈve, exilés, nous crions vers vous. Vers vous nous soupirons, gémissant et pleurant dans cette vallée de larmes. Ô vous, notre avocate, tournez vers nous vos regards miséricordieux. Et après cet exil, montrez-nous Jésus, le fruit béni de vos entrailles. Ô clémente, ô miséricordieuse, ô douce Vierge Marie.',
            la: 'Sálve Regína, Máter misericórdiæ, víta, dulcédo, et spes nóstra, sálve. Ad te clamámus, éxsules fílii Hévæ. Ad te suspirámus, geméntes et fléntes in hac lacrimárum válle. Éia érgo, Advocáta nóstra, íllos túos misericórdes óculos ad nos convérte. Et Iésum, benedíctum frúctum véntris túi, nóbis post hoc exsílium osténde. O clémens, O pía, O dúlcis Vírgo María.'
          }},
          //  { id: '', title: { 
          //   vi: '', 
          //   en: '', 
          //   es: '', 
          //   fr: '', 
          //   la: ''}, 
          //  content: { 

          //   vi: '', 
          //   en: '', 
          //   es: '',
          //   fr: '',
          //   la: ''
          // }},
        ],
    },
    logoUrl: 'https://congregatiomissionis.org/wp-content/uploads/2024/09/Logo-CM-tradicional-sin-fondo.png',
    headerTitle: { vi: 'Phụng Vụ Vinh Sơn', en: 'Vincentian Liturgy' },
    headerSubtitle: { vi: 'Dành cho gia đình Vinh Sơn', en: 'For the Vincentian Family', es: 'Para la Familia Vicenciana', fr: 'Pour la Famille Vincentienne', la: 'Pro Familia Vincentiana' },
    mainSections: [
      { id: 'prayers', title: { vi: 'Kinh Nguyện', en: 'Prayers', es: 'Oraciones', fe: 'Prières', la: 'Orationes'}, icon: 'fa-book-pray' }
    ],
    supportEmail: 'bantruyenthong.vinhson@gmail.com',
    sectionsConfig: SECTIONS_CONFIG,
    aboutContent: {
      title: { vi: 'Về Ứng Dụng', en: 'About The App' },
      p1: {
          vi: '<strong>Phụng Vụ Vinh Sơn</strong> là một ứng dụng web được thiết kế để cung cấp các bài đọc và tài liệu phụng vụ cho các ngày lễ trong lịch Vinh Sơn. Mục tiêu của chúng tôi là làm cho các nguồn tài liệu này dễ dàng truy cập cho các thành viên của Tu Hội Truyền Giáo, Tu Hội Nữ Tử Bác Ái, và tất cả những ai quan tâm đến linh đạo Vinh Sơn.',
          en: '<strong>Vincentian Liturgy</strong> is a web application designed to provide liturgical readings and materials for feast days in the Vincentian calendar. Our goal is to make these resources easily accessible to members of the Congregation of the Mission, the Daughters of Charity, and all who are interested in Vincentian spirituality.'
      },
      p2_title: { vi: 'Ứng dụng này bao gồm:', en: 'This application features:' },
      li1: { vi: 'Tiểu sử các vị thánh Vinh Sơn.', en: 'Biographies of Vincentian saints.' },
      li2: { vi: 'Các bài đọc Thánh Lễ và Kinh Phụng Vụ cho các ngày lễ quan trọng.', en: 'Mass readings and Liturgy of the Hours for important feasts.' },
      li3: { vi: 'Giao diện đa ngôn ngữ để phục vụ cộng đồng rộng lớn hơn.', en: 'A multilingual interface to serve a wider community.' },
      li4: { vi: 'Các tùy chọn tùy chỉnh như thay đổi giao diện và cỡ chữ để có trải nghiệm đọc tốt nhất.', en: 'Customization options like theme and font size changes for the best reading experience.' },
      p3: {
          vi: 'Dự án này là một nỗ lực của tình yêu, được phát triển và duy trì bởi những người có lòng yêu mến di sản của Thánh Vinh Sơn Phaolô. Chúng tôi hy vọng bạn sẽ thấy nó hữu ích trong đời sống thiêng liêng của mình.',
          en: 'This project is a labor of love, developed and maintained by individuals passionate about the heritage of St. Vincent de Paul. We hope you find it useful in your spiritual life.'
      },
      p4: { vi: 'Mọi ý kiến đóng góp xin vui lòng liên hệ với ban quản trị.', en: 'For any feedback or suggestions, please contact the administration.' },
      go_back: { vi: 'Quay Về', en: 'Go Back' }
    },
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      let parsed = savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
      if (!parsed.languages || parsed.languages.length === 0) parsed.languages = DEFAULT_SETTINGS.languages;
      if (parsed.languages.some(l => l.enabled === undefined)) parsed.languages = parsed.languages.map(l => ({ ...l, enabled: true }));
      if (!parsed.defaultLanguage) parsed.defaultLanguage = DEFAULT_SETTINGS.defaultLanguage;
      if (!parsed.languages.some(l => l.code === parsed.language)) parsed.language = parsed.defaultLanguage;
      if (parsed.prayers && !parsed.mainSectionContents) {
          parsed.mainSectionContents = { 'prayers': parsed.prayers };
          delete parsed.prayers;
      } else if (!parsed.mainSectionContents) {
          parsed.mainSectionContents = {};
      }
      if (parsed.mainSections) {
        for (const section of parsed.mainSections) {
          if (!parsed.mainSectionContents[section.id]) parsed.mainSectionContents[section.id] = [];
        }
      }
      if (!parsed.supportEmail) parsed.supportEmail = DEFAULT_SETTINGS.supportEmail;
      if (parsed.feastTypes && parsed.feastTypes.some(ft => ft.color)) parsed.feastTypes = parsed.feastTypes.map(ft => ({ name: ft.name }));
      if (!parsed.sectionsConfig) parsed.sectionsConfig = DEFAULT_SETTINGS.sectionsConfig;
      if (!parsed.aboutContent) parsed.aboutContent = DEFAULT_SETTINGS.aboutContent;
      return parsed;
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
      return DEFAULT_SETTINGS;
    }
  });

  const [feasts, setFeasts] = useState(() => {
    try {
        const savedFeasts = localStorage.getItem('feasts');
        return savedFeasts ? JSON.parse(savedFeasts) : FEASTS;
    } catch (error) {
        console.error("Failed to parse feasts from localStorage", error);
        return FEASTS;
    }
  });

  const [view, setView] = useState('feastList');
  const [history, setHistory] = useState([]);
  const [selectedFeast, setSelectedFeast] = useState(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState(null);
  const [selectedMainSectionId, setSelectedMainSectionId] = useState(null);
  const [selectedGenericContent, setSelectedGenericContent] = useState(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showEditFeast, setShowEditFeast] = useState(false);
  const [editingFeast, setEditingFeast] = useState(null);
  const [showEditSection, setShowEditSection] = useState(false);
  const [showEditGenericContent, setShowEditGenericContent] = useState(false);
  const [editingGenericContent, setEditingGenericContent] = useState(null);

  const getML = useCallback((textObj) => {
    return getMultilingualText(textObj, settings.language, settings.defaultLanguage);
  }, [settings.language, settings.defaultLanguage]);

  useEffect(() => {
    try {
        if (sessionStorage.getItem('isAdmin') === 'true') {
            setIsAdmin(true);
        }
    } catch (e) { console.error("Could not access sessionStorage", e) }
    
    document.body.className = `theme-${settings.theme}`;
    document.documentElement.lang = settings.language;
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    document.body.className = `theme-${settings.theme}`;
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('feasts', JSON.stringify(feasts));
  }, [feasts]);

  const navigate = useCallback((newView, data = {}) => {
      setHistory(prev => [...prev, { 
        view, 
        feast: selectedFeast, 
        sectionKey: selectedSectionKey, 
        mainSectionId: selectedMainSectionId,
        genericContent: selectedGenericContent,
      }]);
      setView(newView);
      setSelectedFeast(data.feast !== undefined ? data.feast : selectedFeast);
      setSelectedSectionKey(data.sectionKey !== undefined ? data.sectionKey : selectedSectionKey);
      setSelectedMainSectionId(data.mainSectionId !== undefined ? data.mainSectionId : selectedMainSectionId);
      setSelectedGenericContent(data.genericContent !== undefined ? data.genericContent : selectedGenericContent);
      window.scrollTo(0, 0);
  }, [view, selectedFeast, selectedSectionKey, selectedMainSectionId, selectedGenericContent]);

  const handleGoBack = () => {
    if (view === 'feastList' || history.length === 0) {
        handleTitleClick();
        return;
    }
    const previousState = history.pop();
    setHistory([...history]);

    setView(previousState.view);
    setSelectedFeast(previousState.feast || null);
    setSelectedSectionKey(previousState.sectionKey || null);
    setSelectedMainSectionId(previousState.mainSectionId || null);
    setSelectedGenericContent(previousState.genericContent || null);
    window.scrollTo(0, 0);
  };
  
  const handleTitleClick = () => {
    setView('feastList');
    setSelectedFeast(null);
    setSelectedSectionKey(null);
    setSelectedMainSectionId(null);
    setSelectedGenericContent(null);
    setHistory([]);
    window.scrollTo(0, 0);
  };
  
  const handleSelectFeast = (feast) => navigate('feastDetail', { feast: feast, sectionKey: null, genericContent: null, mainSectionId: null });
  const handleSelectSection = (sectionKey) => navigate('sectionView', { sectionKey: sectionKey });
  const handleSelectMainSection = (sectionId) => navigate('genericList', { mainSectionId: sectionId, feast: null, sectionKey: null, genericContent: null });
  const handleSelectGenericContent = (item) => navigate('genericDetail', { genericContent: item });
  
  const handleAdminClick = () => {
      if (isAdmin) {
          setShowAdminPanel(true);
      } else {
          setShowAdminLogin(true);
      }
  };

  const handleLogin = () => {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      setShowAdminLogin(false);
  };

  const handleLogout = () => {
      setIsAdmin(false);
      sessionStorage.removeItem('isAdmin');
  };
  
  const handleSaveSettings = (newSettings) => {
    setSettings(prev => ({...prev, ...newSettings}));
  };
  
  const handleOpenEditFeast = (feast) => {
    setEditingFeast(feast);
    setShowEditFeast(true);
  };

  const handleSaveFeast = (feastToSave) => {
      setFeasts(prevFeasts => {
          const index = prevFeasts.findIndex(f => f.id === feastToSave.id);
          if (index > -1) {
              const newFeasts = [...prevFeasts];
              newFeasts[index] = feastToSave;
              return newFeasts;
          }
          return [...prevFeasts, feastToSave];
      });
      setShowEditFeast(false);
      setEditingFeast(null);
  };

  const handleDeleteFeast = (feastToDelete) => {
      if (window.confirm(getML({vi: "Bạn có chắc muốn xóa lễ này?", en: "Are you sure you want to delete this feast?"}))) {
          setFeasts(prev => prev.filter(f => f.id !== feastToDelete.id));
          handleTitleClick();
      }
  };

  const handleSaveSectionContent = (newContent) => {
    if (!selectedFeast || !selectedSectionKey) return;
    const newFeasts = feasts.map(f => {
      if (f.id === selectedFeast.id) {
        return { ...f, sections: { ...f.sections, [selectedSectionKey]: newContent } };
      }
      return f;
    });
    setFeasts(newFeasts);
    setSelectedFeast(newFeasts.find(f => f.id === selectedFeast.id));
    setShowEditSection(false);
  };
  
  const handleOpenEditGenericContent = (item) => {
    setEditingGenericContent(item);
    setShowEditGenericContent(true);
  }
  
  const handleSaveGenericContent = (itemToSave) => {
    const newContents = [...(settings.mainSectionContents[selectedMainSectionId] || [])];
    const index = newContents.findIndex(i => i.id === itemToSave.id);
     if (index > -1) {
        newContents[index] = itemToSave;
      } else {
        newContents.push(itemToSave);
      }
    setSettings(prev => ({...prev, mainSectionContents: {...prev.mainSectionContents, [selectedMainSectionId]: newContents }}));
    setSelectedGenericContent(itemToSave);
    setShowEditGenericContent(false);
    setEditingGenericContent(null);
  }
  
  const handleDeleteGenericContent = (itemToDelete) => {
    if (window.confirm(getML({vi: "Bạn có chắc muốn xóa mục này?", en: "Are you sure you want to delete this item?"}))) {
      const newContents = (settings.mainSectionContents[selectedMainSectionId] || []).filter(i => i.id !== itemToDelete.id);
      setSettings(prev => ({...prev, mainSectionContents: {...prev.mainSectionContents, [selectedMainSectionId]: newContents }}));
      navigate('genericList', { mainSectionId: selectedMainSectionId });
    }
  }

  const getSectionTitle = (sectionKey) => {
      const config = settings.sectionsConfig.find(c => c.key === sectionKey);
      return config ? config.title : { vi: 'Không rõ', en: 'Unknown' };
  };
  
  const getOrderedSections = () => {
    if (!selectedFeast) return [];
    return settings.sectionsConfig
      .map(s => s.key)
      .filter(key => selectedFeast.sections[key] && getML(selectedFeast.sections[key] || '').trim() !== '' && getML(selectedFeast.sections[key] || '').trim() !== getML(placeholder).trim());
  }
  
  const getOrderedGenericContent = () => {
    if(!selectedMainSectionId) return [];
    return settings.mainSectionContents[selectedMainSectionId] || [];
  }
  
  const canNavigate = (direction, items, currentItemKey, keyField = 'key') => {
      if (!currentItemKey || items.length < 2) return false;
      const currentIndex = items.findIndex(item => (keyField === 'key' ? item : item.id) === currentItemKey);
      if (currentIndex === -1) return false;
      if (direction === 'prev') return currentIndex > 0;
      if (direction === 'next') return currentIndex < items.length - 1;
      return false;
  };
  
  const handleNavigation = (direction, orderedItems, currentItem, keyField, setItemFunction) => {
      const currentIndex = orderedItems.findIndex(item => (keyField === 'key' ? item : item.id) === currentItem);
      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= 0 && newIndex < orderedItems.length) {
          setItemFunction(keyField === 'key' ? orderedItems[newIndex] : orderedItems[newIndex]);
      }
  };

  const sortedFeasts = useMemo(() => {
    return [...feasts].sort((a, b) => {
        const dateA = a.date.replace('-', '');
        const dateB = b.date.replace('-', '');
        return dateA.localeCompare(dateB);
    });
  }, [feasts]);
  
  if (isLoading) {
    return React.createElement(Spinner, null);
  }

  const renderContent = () => {
    switch (view) {
      case 'feastDetail':
        return selectedFeast && React.createElement(FeastDetail, { 
          feast: selectedFeast, 
          onSelectSection: handleSelectSection,
          isAdmin: isAdmin,
          onEditFeast: () => handleOpenEditFeast(selectedFeast),
          onDeleteFeast: () => handleDeleteFeast(selectedFeast),
          getML: getML,
          getSectionTitle: getSectionTitle,
          sectionsConfig: settings.sectionsConfig
        });
      case 'sectionView':
        const orderedSections = getOrderedSections();
        return selectedFeast && selectedSectionKey && React.createElement(SectionView, {
            feastTitle: getML(selectedFeast.title),
            sectionTitle: getML(getSectionTitle(selectedSectionKey)),
            content: getML(selectedFeast.sections[selectedSectionKey]) || '',
            isAdmin: isAdmin,
            onEdit: () => setShowEditSection(true),
            getML: getML,
            fontSize: settings.fontSize,
            onFontSizeChange: (size) => setSettings(s => ({...s, fontSize: size})),
            onNavigateSection: (dir) => handleNavigation(dir, orderedSections, selectedSectionKey, 'key', setSelectedSectionKey),
            canNavigatePrev: canNavigate('prev', orderedSections, selectedSectionKey),
            canNavigateNext: canNavigate('next', orderedSections, selectedSectionKey)
        });
      case 'genericList':
        return selectedMainSectionId && React.createElement(GenericContentList, {
          key: `generic-list-${(settings.mainSectionContents[selectedMainSectionId] || []).length}`,
          items: settings.mainSectionContents[selectedMainSectionId] || [], 
          onSelectItem: handleSelectGenericContent, 
          getML: getML,
          isAdmin: isAdmin,
          onAddNew: () => handleOpenEditGenericContent(null),
          title: settings.mainSections.find(s => s.id === selectedMainSectionId)?.title || {vi: 'Danh Sách', en: 'List'}
        });
      case 'genericDetail':
        const orderedGenericContent = getOrderedGenericContent();
        return selectedGenericContent && React.createElement(GenericContentDetail, {
          item: selectedGenericContent,
          isAdmin: isAdmin,
          onEdit: () => handleOpenEditGenericContent(selectedGenericContent),
          onDelete: () => handleDeleteGenericContent(selectedGenericContent),
          getML: getML,
          fontSize: settings.fontSize,
          onFontSizeChange: (size) => setSettings(s => ({...s, fontSize: size})),
          onNavigateItem: (dir) => handleNavigation(dir, orderedGenericContent, selectedGenericContent.id, 'id', setSelectedGenericContent),
          canNavigatePrev: canNavigate('prev', orderedGenericContent, selectedGenericContent.id, 'id'),
          canNavigateNext: canNavigate('next', orderedGenericContent, selectedGenericContent.id, 'id')
          });
      case 'about':
        return React.createElement(AboutPage, { 
            onGoBack: handleGoBack, 
            language: settings.language, 
            defaultLanguage: settings.defaultLanguage,
            content: settings.aboutContent
        });
      case 'feastList':
      default:
        return React.createElement(FeastList, {
          key: `feast-list-${sortedFeasts.length}`,
          feasts: sortedFeasts,
          onSelectFeast: handleSelectFeast,
          feastTypes: settings.feastTypes,
          getML: getML,
          mainSections: settings.mainSections,
          onSelectMainSection: handleSelectMainSection,
          isAdmin: isAdmin,
          onAddNewFeast: () => handleOpenEditFeast(null)
        });
    }
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans flex flex-col items-center" },
    React.createElement(Header, {
      onGoBack: handleGoBack,
      showBackButton: view !== 'feastList',
      currentLanguage: settings.language,
      languages: settings.languages.filter(l => l.enabled),
      defaultLanguage: settings.defaultLanguage,
      onLanguageChange: (lang) => setSettings(s => ({...s, language: lang})),
      onThemeChange: (theme) => setSettings(s => ({...s, theme})),
      currentTheme: settings.theme,
      onAdminClick: handleAdminClick,
      isAdmin: isAdmin,
      onLogout: handleLogout,
      logoUrl: settings.logoUrl,
      title: settings.headerTitle,
      subtitle: settings.headerSubtitle,
      onTitleClick: handleTitleClick,
      onAboutClick: () => navigate('about')
    }),
    React.createElement(
      "main",
      { className: "w-full max-w-4xl mx-auto p-4 flex-grow container" },
      renderContent()
    ),
    React.createElement(Footer, { content: getML(settings.footerContent) }),
    React.createElement(ScrollToTopButton, null),
    showAdminLogin && React.createElement(AdminLogin, { onClose: () => setShowAdminLogin(false), onLogin: handleLogin, adminPassword: settings.adminPassword, getML: getML }),
    isAdmin && showAdminPanel && React.createElement(AdminPanelModal, { onClose: () => setShowAdminPanel(false), onSave: handleSaveSettings, settings: settings, getML: getML }),
    isAdmin && showEditFeast && React.createElement(EditFeastModal, { onClose: () => { setShowEditFeast(false); setEditingFeast(null); }, onSave: handleSaveFeast, feast: editingFeast, getML: getML, languages: settings.languages, feastTypes: settings.feastTypes, sectionsConfig: settings.sectionsConfig }),
    isAdmin && showEditSection && React.createElement(EditSectionModal, { onClose: () => setShowEditSection(false), onSave: handleSaveSectionContent, sectionContent: selectedFeast?.sections[selectedSectionKey], sectionTitle: getML(getSectionTitle(selectedSectionKey)), getML: getML, languages: settings.languages }),
    isAdmin && showEditGenericContent && React.createElement(EditGenericContentModal, { onClose: () => { setShowEditGenericContent(false); setEditingGenericContent(null); }, onSave: handleSaveGenericContent, item: editingGenericContent, getML: getML, languages: settings.languages })
  );
};

// START OF FILE: index.tsx
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = createRoot(rootElement);
root.render(React.createElement(App, null));
