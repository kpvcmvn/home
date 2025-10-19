import type { Feast } from './types';

const placeholder = {
  vi: `<p class="text-center text-gray-400 italic">Nội dung cho phần này đang được cập nhật...</p>`,
  en: `<p class="text-center text-gray-400 italic">Content for this section is being updated...</p>`,
  es: `<p class="text-center text-gray-400 italic">El contenido de esta sección se está actualizando...</p>`,
  fr: `<p class="text-center text-gray-400 italic">Le contenu de cette section est en cours de mise à jour...</p>`,
  la: `<p class="text-center text-gray-400 italic">Contentus huius sectionis renovatur...</p>`,
};

export const FEASTS: Feast[] = [
  {
    id: 'st-elizabeth-ann-seton',
    date: '01-04',
    title: { 
      vi: 'Thánh Nữ Ê-li-za-bét An-na Xe-tôn',
      en: 'St. Elizabeth Ann Seton',
      es: 'Santa Isabel Ana Seton',
      fr: 'Sainte Élisabeth-Ann Seton',
      la: 'Sancta Elisabeth Anna Seton'
    },
    subtitle: {
      vi: 'Nữ tu',
      en: 'Religious',
      es: 'Religiosa',
      fr: 'Religieuse',
      la: 'Religiosa'
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
        es: `<strong>Biografía</strong>
Elizabeth Ann Bayley nació en Nueva York el 28 de agosto de 1774, en vísperas de los acontecimientos que llevarían a los Estados Unidos de América a su Independencia. Huérfana de madre a los tres años, creció en una familia marcada por el segundo matrimonio de su padre y su pertenencia a la Iglesia Episcopal.
Se casó con William Seton a los 20 años, y de este matrimonio tuvo cinco hijos. Durante un viaje de negocios a Italia, su esposo murió en Pisa el 27 de diciembre de 1803. Fue acogida y consolada por una amigable familia católica: la familia Felicchi, en la que descubrió una profunda caridad.
A su regreso a los Estados Unidos, Elizabeth, una devota episcopaliana, se sintió fuertemente atraída por la doctrina católica. Su familia, al no comprender su búsqueda, la abandonó. Elizabeth enfrentó entonces muchas pruebas personales y familiares. Finalmente, el 14 de marzo de 1805, fue recibida en la Iglesia Católica.
Mientras mantenía una intensa vida espiritual y cuidaba regularmente la educación de sus hijos, persiguió su propio interés de comprometerse plenamente con las obras de caridad. En 1809, fundó la Congregación de las Hermanas de la Caridad en la diócesis de Baltimore, con San José como patrón, para la educación de las jóvenes. Bajo la guía del obispo Cheverus, deseaba afiliarse a la Compañía de las Hijas de la Caridad de San Vicente de Paúl, pero la situación política de la época impidió este plan. El 4 de enero de 1821, Elizabeth Ann Seton murió en Emmitsburg. También fue la fundadora de cinco ramas de Hermanas de la Caridad americanas. La rama de Emmitsburg se fusionaría con la Compañía de las Hijas de la Caridad el 25 de marzo de 1850.
Formada por la Palabra de Dios, con un ferviente amor por la Iglesia, Elizabeth Ann Seton dejó un sólido legado de pensamiento. Fue beatificada por el Papa Juan XXIII el 17 de marzo de 1963 y canonizada por el Papa Pablo VI el 14 de septiembre de 1975.`,
        fr: `<strong>Biographie</strong>
Elizabeth Ann Bayley est née à New York le 28 août 1774, à la veille des événements qui allaient conduire les États-Unis d'Amérique à leur indépendance. Orpheline de sa mère à l'âge de trois ans, elle a grandi dans une famille marquée par le remariage de son père et leur appartenance à l'Église épiscopalienne.
Elle a épousé William Seton à l'âge de 20 ans, et de ce mariage, elle a eu cinq enfants. Lors d'un voyage d'affaires en Italie, son mari est décédé à Pise le 27 décembre 1803. Elle a été accueillie et réconfortée par une famille catholique amie : la famille Felicchi, chez qui elle a découvert une profonde charité.
À son retour aux États-Unis, Elizabeth, une fervente épiscopalienne, se sentit fortement attirée par la doctrine catholique. Sa famille, ne comprenant pas sa quête, l'abandonna. Elizabeth a alors dû faire face à de nombreuses épreuves personnelles et familiales. Finalement, le 14 mars 1805, elle fut reçue dans l'Église catholique.
Tout en menant une vie spirituelle intense et en s'occupant régulièrement de l'éducation de ses enfants, elle a poursuivi son propre intérêt à s'engager pleinement dans les œuvres de charité. En 1809, elle a fondé la Congrégation des Sœurs de la Charité dans le diocèse de Baltimore, avec saint Joseph comme patron, pour l'éducation des jeunes filles. Sous la direction de Mgr Cheverus, elle souhaitait être affiliée à la Compagnie des Filles de la Charité de saint Vincent de Paul, mais la situation politique de l'époque a empêché ce projet. Le 4 janvier 1821, Elizabeth Ann Seton est décédée à Emmitsburg. Elle est également à l'origine de cinq branches de Sœurs de la Charité américaines. La branche d'Emmitsburg fusionnera avec la Compagnie des Filles de la Charité le 25 mars 1850.
Formée par la Parole de Dieu, avec un amour fervent pour l'Église, Elizabeth Ann Seton a laissé un solide héritage de pensée. Elle a été béatifiée par le pape Jean XXIII le 17 mars 1963 et canonisée par le pape Paul VI le 14 septembre 1975.`,
        la: `<strong>Vita</strong>
Elisabeth Anna Bayley nata est Novi Eboraci die 28 Augusti 1774, pridie eventuum qui Civitates Foederatas Americae ad libertatem ducerent. Matre orbata tres annos nata, in familia crevit patris secundis nuptiis et adhaesione ad Ecclesiam Episcopalem notata.
Gulielmo Seton nupsit viginti annos nata, et ex hoc matrimonio quinque filios habuit. In itinere negotiatorio in Italiam, maritus eius Pisis obiit die 27 Decembris 1803. A familia catholica amica excepta et consolata est: familia Felicchi, in qua profundam caritatem invenit.
In Civitates Foederatas reversa, Elisabeth, devota episcopaliana, nunc ad doctrinam catholicam vehementer attracta sensit. Familia eius, hanc quaestionem non intelligens, eam deseruit. Elisabeth tunc multis personalibus et familiaribus probationibus obviam ivit. Denique, die 14 Martii 1805, in Ecclesiam Catholicam recepta est.
Dum vitam spiritualem intensam gerebat et filiorum educationi regulariter vacabat, proprium studium se plene operibus caritatis dedicandi secuta est. Anno 1809, Congregationem Sororum Caritatis in dioecesi Baltimorensi fundavit, Sancto Iosepho patrono, ad puellarum educationem. Sub ductu Episcopi Cheverus, cum Societate Filiarum Caritatis Sancti Vincentii a Paulo affiliari cupiebat, sed rerum politicarum condicio tunc temporis hoc consilium impedivit. Die 4 Ianuarii 1821, Elisabeth Anna Seton Emmitsburgi obiit. Fuit etiam origo quinque ramorum Sororum Caritatis Americanarum. Ramus Emmitsburgensis cum Societate Filiarum Caritatis die 25 Martii 1850 uniretur.
Verbo Dei formata, ferventi amore erga Ecclesiam, Elisabeth Anna Seton solidum cogitationis legatum reliquit. A Papa Ioanne XXIII beatificata est die 17 Martii 1963, et a Papa Paulo VI canonizata die 14 Septembris 1975.`
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
        es: `<strong>MISA</strong>
<strong>Antífona de entrada (Jer 17, 7-8)</strong>
Bendito el hombre que confía en el Señor y pone en el Señor su confianza. Será como un árbol plantado junto al agua, que junto a la corriente echa sus raíces.
<strong>Oración colecta</strong>
Oh, Dios, que coronaste con el don de la verdadera fe a santa Isabel Ana Seton, concédenos, te rogamos, que, por su ejemplo e intercesión, crezcamos en amor por ti y nos dediquemos con celo al servicio de los necesitados. Por nuestro Señor Jesucristo, tu Hijo.
<strong>Lectura (1 Jn 3, 14-18)</strong>
<em>Lectura de la primera carta del apóstol san Juan.</em>
Queridos hermanos, nosotros sabemos que hemos pasado de la muerte a la vida, porque amamos a los hermanos. El que no ama permanece en la muerte. Todo el que odia a su hermano es un homicida. Y sabéis que ningún homicida tiene vida eterna permanente en él. En esto hemos conocido el amor: en que él dio su vida por nosotros. Así también nosotros debemos dar la vida por los hermanos. Si alguno que posee bienes del mundo ve a su hermano que está necesitado y le cierra sus entrañas, ¿cómo puede permanecer en él el amor de Dios? Hijitos, no amemos de palabra ni de boca, sino de obra y de verdad.
<strong>Salmo responsorial (Sal 16)</strong>
<strong>R. ¡Tú eres mi heredad, Señor!</strong>
Protégeme, Dios mío, que me refugio en ti. Yo digo al Señor: «Tú eres mi bien». <strong>R.</strong>
Bendeciré al Señor, que me aconseja, hasta de noche me instruye internamente. Tengo siempre presente al Señor, con él a mi derecha no vacilaré. <strong>R.</strong>
Me enseñarás el sendero de la vida, me saciarás de gozo en tu presencia, de alegría perpetua a tu derecha. <strong>R.</strong>
<strong>Aclamación del Evangelio (Jn 15, 16)</strong>
Aleluya, aleluya. Yo os he elegido del mundo —dice el Señor—, para que vayáis y deis fruto, y vuestro fruto permanezca. Aleluya, aleluya.
<strong>Evangelio (Jn 15, 9-17)</strong>
<strong>Lectura del santo Evangelio según san Juan.</strong>
En aquel tiempo, dijo Jesús a sus discípulos: «Como el Padre me ha amado, así os he amado yo; permaneced en mi amor. Si guardáis mis mandamientos, permaneceréis en mi amor; lo mismo que yo he guardado los mandamientos de mi Padre y permanezco en su amor. Os he hablado de esto para que mi alegría esté en vosotros, y vuestra alegría llegue a plenitud. Este es mi mandamiento: que os améis unos a otros como yo os he amado. Nadie tiene amor más grande que el que da la vida por sus amigos. Vosotros sois mis amigos, si hacéis lo que yo os mando. Ya no os llamo siervos, porque el siervo no sabe lo que hace su señor: a vosotros os llamo amigos, porque todo lo que he oído a mi Padre os lo he dado a conocer. No sois vosotros los que me habéis elegido, soy yo quien os he elegido y os he destinado para que vayáis y deis fruto, y vuestro fruto permanezca. De modo que lo que pidáis al Padre en mi nombre os lo dé. Esto os mando: que os améis unos a otros».
<strong>Oración sobre las ofrendas</strong>
Señor, que el sacrificio que te ofrecemos en esta memoria de santa Isabel Ana Seton sea un signo de nuestro amoroso servicio a ti y a nuestro prójimo. Te lo pedimos por Cristo nuestro Señor.
<strong>Antífona de comunión (Jn 8, 12)</strong>
Dice el Señor: Yo soy la luz del mundo; el que me sigue no caminará en tinieblas, sino que tendrá la luz de la vida.
<strong>Oración después de la comunión</strong>
Señor, que esta Eucaristía, que hemos compartido en memoria de santa Isabel Ana Seton, nos llene del espíritu de tu amor. Que aprendamos a amarte y a servirte en nuestros hermanos. Te lo pedimos por Cristo nuestro Señor.`,
        fr: `<strong>MESSE</strong>
<strong>Antienne d'ouverture (Jr 17, 7-8)</strong>
Béni soit l'homme qui met sa foi dans le Seigneur, dont le Seigneur est la confiance. Il est comme un arbre planté près des eaux, qui étend ses racines vers le courant.
<strong>Prière d'ouverture</strong>
Dieu qui as comblé sainte Élisabeth-Ann Seton du don de la vraie foi, accorde-nous, nous t'en prions, par son exemple et son intercession, de grandir dans ton amour et de nous dévouer avec zèle au service des nécessiteux. Par Jésus Christ, ton Fils, notre Seigneur.
<strong>Lecture (1 Jn 3, 14-18)</strong>
<em>Lecture de la première lettre de saint Jean.</em>
Bien-aimés, nous savons que nous sommes passés de la mort à la vie, parce que nous aimons nos frères. Celui qui n'aime pas demeure dans la mort. Quiconque a de la haine pour son frère est un meurtrier, et vous savez que pas un meurtrier n'a la vie éternelle demeurant en lui. Voici comment nous avons connu l'amour : il a donné sa vie pour nous. Nous aussi, nous devons donner notre vie pour nos frères. Si quelqu'un, qui a les biens de ce monde, voit son frère dans le besoin et lui ferme ses entrailles, comment l'amour de Dieu demeurerait-il en lui ? Petits enfants, n'aimons pas en paroles ni par des discours, mais par des actes et en vérité.
<strong>Psaume responsorial (Ps 16)</strong>
<strong>R. Tu es, Seigneur, le partage de mon héritage !</strong>
Garde-moi, mon Dieu : j'ai fait de toi mon refuge. J'ai dit au Seigneur : « Tu es mon Dieu ! Je n'ai pas d'autre bonheur que toi. » <strong>R.</strong>
Je bénis le Seigneur qui me conseille : même la nuit mon cœur m'avertit. Je garde le Seigneur devant moi sans relâche ; il est à ma droite, je suis inébranlable. <strong>R.</strong>
Tu m'apprendras le chemin de la vie : devant ta face, débordement de joie ! À ta droite, éternité de délices ! <strong>R.</strong>
<strong>Acclamation de l'Évangile (Jn 15, 16)</strong>
Alléluia, alléluia. C'est moi qui vous ai choisis du milieu du monde, afin que vous alliez, que vous portiez du fruit, et que votre fruit demeure, dit le Seigneur. Alléluia, alléluia.
<strong>Évangile (Jn 15, 9-17)</strong>
<strong>Lecture du saint Évangile selon saint Jean.</strong>
En ce temps-là, Jésus disait à ses disciples : « Comme le Père m'a aimé, moi aussi je vous ai aimés. Demeurez dans mon amour. Si vous gardez mes commandements, vous demeurerez dans mon amour, comme moi, j'ai gardé les commandements de mon Père, et je demeure dans son amour. Je vous ai dit cela pour que ma joie soit en vous, et que votre joie soit parfaite. Mon commandement, le voici : Aimez-vous les uns les autres comme je vous ai aimés. Il n’y a pas de plus grand amour que de donner sa vie pour ceux qu’on aime. Vous êtes mes amis si vous faites ce que je vous commande. Je ne vous appelle plus serviteurs, car le serviteur ne sait pas ce que fait son maître ; je vous appelle mes amis, parce que tout ce que j'ai entendu de mon Père, je vous l'ai fait connaître. Ce n'est pas vous qui m'avez choisi, c'est moi qui vous ai choisis et établis, afin que vous alliez, que vous portiez du fruit, et que votre fruit demeure. Alors, tout ce que vous demanderez au Père en mon nom, il vous le donnera. Ce que je vous commande, c'est de vous aimer les uns les autres. »
<strong>Prière sur les offrandes</strong>
Seigneur notre Dieu, que le sacrifice que nous t'offrons en cette mémoire de sainte Élisabeth-Ann Seton soit un signe de notre service aimant envers toi et notre prochain. Nous te le demandons par le Christ notre Seigneur.
<strong>Antienne de la communion (Jn 8, 12)</strong>
Le Seigneur dit : Je suis la lumière du monde. Celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.
<strong>Prière après la communion</strong>
Seigneur, que cette Eucharistie, que nous avons partagée en mémoire de sainte Élisabeth-Ann Seton, nous remplisse de l'esprit de ton amour. Puissions-nous apprendre à t'aimer et à te servir en nos frères et sœurs. Nous te le demandons par le Christ notre Seigneur.`,
        la: `<strong>MISSA</strong>
<strong>Antiphona ad introitum (Ier 17, 7-8)</strong>
Benedictus vir qui confidit in Domino, et erit Dominus fiducia eius. Et erit quasi lignum quod transplantatur super aquas, quod ad humorem mittit radices suas.
<strong>Collecta</strong>
Deus, qui sanctam Elisabeth Annam Seton verae fidei dono coronavisti, concede, quaesumus, ut, eius exemplo et intercessione, in tui amore crescamus et egentium servitio ardenter nos impendamus. Per Dominum nostrum Iesum Christum Filium tuum.
<strong>Lectio (1 Io 3, 14-18)</strong>
<em>Lectio Epistulae primae beati Ioannis Apostoli.</em>
Carissimi, nos scimus quoniam transivimus de morte in vitam, quoniam diligimus fratres. Qui non diligit, manet in morte. Omnis qui odit fratrem suum, homicida est. Et scitis quoniam omnis homicida non habet vitam aeternam in se manentem. In hoc cognovimus caritatem, quoniam ille animam suam pro nobis posuit; et nos debemus pro fratribus animas ponere. Qui habuerit substantiam huius mundi, et viderit fratrem suum necessitatem habere, et clauserit viscera sua ab eo, quomodo caritas Dei manet in eo? Filioli, non diligamus verbo nec lingua, sed opere et veritate.
<strong>Psalmus responsorius (Ps 16)</strong>
<strong>R. Tu es, Domine, pars hereditatis meae.</strong>
Conserva me, Deus, quoniam speravi in te. Dixi Domino: «Dominus meus es tu, bonum mihi non est sine te». <strong>R.</strong>
Benedicam Dominum, qui tribuit mihi intellectum; insuper et usque ad noctem increpuerunt me renes mei. Providebam Dominum in conspectu meo semper; quoniam a dextris est mihi, non commovebor. <strong>R.</strong>
Notas mihi facies vias vitae, adimpletionem laetitiae cum vultu tuo, delectationes in dextera tua usque in finem. <strong>R.</strong>
<strong>Acclamatio ad Evangelium (Io 15, 16)</strong>
Alleluia, alleluia. Ego vos elegi de mundo, ut eatis et fructum afferatis, et fructus vester maneat, dicit Dominus. Alleluia, alleluia.
<strong>Evangelium (Io 15, 9-17)</strong>
<strong>Lectio sancti Evangelii secundum Ioannem.</strong>
In illo tempore, dixit Iesus discipulis suis: «Sicut dilexit me Pater, et ego dilexi vos. Manete in dilectione mea. Si praecepta mea servaveritis, manebitis in dilectione mea, sicut et ego Patris mei praecepta servavi, et maneo in eius dilectione. Haec locutus sum vobis, ut gaudium meum in vobis sit, et gaudium vestrum impleatur. Hoc est praeceptum meum, ut diligatis invicem, sicut dilexi vos. Maiorem hac dilectionem nemo habet, ut animam suam ponat quis pro amicis suis. Vos amici mei estis, si feceritis quae ego praecipio vobis. Iam non dico vos servos, quia servus nescit quid faciat dominus eius; vos autem dixi amicos, quia omnia quaecumque audivi a Patre meo, nota feci vobis. Non vos me elegistis, sed ego elegi vos, et posui vos ut eatis, et fructum afferatis, et fructus vester maneat; ut quodcumque petieritis Patrem in nomine meo, det vobis. Haec mando vobis, ut diligatis invicem».
<strong>Oratio super oblata</strong>
Domine Deus, sacrificium quod tibi offerimus in hac memoria sanctae Elisabeth Annae Seton, sit signum nostri amoris et servitii erga te et proximum. Per Christum Dominum nostrum.
<strong>Antiphona ad communionem (Io 8, 12)</strong>
Dicit Dominus: Ego sum lux mundi. Qui sequitur me, non ambulabit in tenebris, sed habebit lumen vitae.
<strong>Post communionem</strong>
Domine, haec Eucharistia, quam in memoriam sanctae Elisabeth Annae Seton sumpsimus, nos spiritu tui amoris impleat. Discamus te diligere et tibi in fratribus nostris servire. Per Christum Dominum nostrum.`
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
      es: 'Beata Rosalía Rendu',
      fr: 'Bienheureuse Rosalie Rendu',
      la: 'Beata Rosalia Rendu'
    },
    subtitle: {
      vi: 'Nữ Tử Bác Ái',
      en: 'Daughter of Charity',
      es: 'Hija de la Caridad',
      fr: 'Fille de la Charité',
      la: 'Filia Caritatis'
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
    id: 'st-francis-regis-clet',
    date: '02-18',
    title: {
      vi: 'Thánh Phan-xi-cô Rê-gi-xê Cờ-lê',
      en: 'St. Francis Regis Clet',
      es: 'San Francisco Régis Clet',
      fr: 'Saint François-Régis Clet',
      la: 'Sanctus Franciscus Regis Clet'
    },
    subtitle: {
      vi: 'Linh mục, Tử đạo',
      en: 'Priest, Martyr',
      es: 'Sacerdote, Mártir',
      fr: 'Prêtre, Martyr',
      la: 'Sacerdos, Martyr'
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
      es: 'Beato Pedro Renato Rogue',
      fr: 'Bienheureux Pierre-René Rogue',
      la: 'Beatus Petrus Renatus Rogue'
    },
    subtitle: {
      vi: 'Linh mục, Tử đạo',
      en: 'Priest, Martyr',
      es: 'Sacerdote, Mártir',
      fr: 'Prêtre, Martyr',
      la: 'Sacerdos, Martyr'
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
        es: 'Beata Lindalva Justo de Oliveira',
        fr: 'Bienheureuse Lindalva Justo de Oliveira',
        la: 'Beata Lindalva Justo de Oliveira'
    },
    subtitle: {
        vi: 'Nữ Tử Bác Ái, Tử đạo',
        en: 'Daughter of Charity, Martyr',
        es: 'Hija de la Caridad, Mártir',
        fr: 'Fille de la Charité, Martyre',
        la: 'Filia Caritatis, Martyr'
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
        es: 'Beata Margarita Rutan',
        fr: 'Bienheureuse Marguerite Rutan',
        la: 'Beata Margarita Rutan'
    },
    subtitle: {
        vi: 'Nữ Tử Bác Ái, Tử đạo',
        en: 'Daughter of Charity, Martyr',
        es: 'Hija de la Caridad, Mártir',
        fr: 'Fille de la Charité, Martyre',
        la: 'Filia Caritatis, Martyr'
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
      es: 'Conmemoración de la Fundación de la Congregación de la Misión',
      fr: 'Commémoration de la Fondation de la Congrégation de la Mission',
      la: 'Commemoratio Fundationis Congregationis Missionis'
    },
    subtitle: {
      vi: 'Ngày 17 tháng 4 năm 1625',
      en: 'April 17, 1625',
      es: '17 de abril de 1625',
      fr: '17 avril 1625',
      la: '17 Aprilis 1625'
    },
    type: 'Kỷ niệm',
    sections: {
      biography: {
        vi: '<strong>Lịch sử</strong><br>Thánh Vinh Sơn Phaolô, do lòng trắc ẩn trước sự nghèo đói về mặt thiêng liêng của người dân nông thôn, đã thành lập Tu hội Truyền giáo vào ngày 17 tháng 4 năm 1625, thông qua một hợp đồng với gia đình de Gondi. Cộng đoàn mới gồm các linh mục và tu sĩ đã tự hiến dâng để rao giảng các cuộc đại phúc cho người nghèo ở nông thôn và đào tạo một hàng giáo sĩ đức hạnh. Điều này đã đánh dấu sự khởi đầu của một gia đình thiêng liêng trên toàn thế giới, cam kết loan báo Tin Mừng và phục vụ những người bị bỏ rơi nhất.',
        en: '<strong>History</strong><br>St. Vincent de Paul, moved by the spiritual poverty of the rural people, established the Congregation of the Mission on April 17, 1625, through a contract with the de Gondi family. The new community of priests and brothers dedicated themselves to preaching missions to the poor in the countryside and forming a virtuous clergy. This marked the beginning of a worldwide spiritual family committed to evangelizing and serving the most abandoned.',
        es: '<strong>Historia</strong><br>San Vicente de Paúl, movido por la pobreza espiritual de la gente del campo, estableció la Congregación de la Misión el 17 de abril de 1625, mediante un contrato con la familia de Gondi. La nueva comunidad de sacerdotes y hermanos se dedicó a predicar misiones a los pobres del campo y a formar un clero virtuoso. Esto marcó el comienzo de una familia espiritual mundial comprometida con la evangelización y el servicio a los más abandonados.',
        fr: '<strong>Histoire</strong><br>Saint Vincent de Paul, ému par la pauvreté spirituelle des populations rurales, a fondé la Congrégation de la Mission le 17 avril 1625, par un contrat avec la famille de Gondi. La nouvelle communauté de prêtres et de frères s\'est consacrée à la prédication de missions pour les pauvres dans les campagnes et à la formation d\'un clergé vertueux. Cela a marqué le début d\'une famille spirituelle mondiale engagée dans l\'évangélisation et le service des plus abandonnés.',
        la: '<strong>Historia</strong><br>Sanctus Vincentius a Paulo, paupertate spirituali populi rustici motus, Congregationem Missionis die 17 Aprilis 1625 condidit, per contractum cum familia de Gondi. Nova communitas sacerdotum et fratrum se dedicaverunt ad missiones praedicandas pauperibus in agris et ad clerum virtuosum formandum. Hoc initium notavit familiae spiritualis per orbem terrarum commissae evangelizandi et serviendi maxime derelictis.'
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
        es: 'Traslación de las Reliquias de San Vicente',
        fr: 'Translation des Reliques de Saint Vincent',
        la: 'Translatio Reliquiarum S. Vincentii'
    },
    subtitle: {
        vi: 'Kỷ niệm việc di chuyển thánh tích của Thánh Vinh Sơn Phaolô',
        en: 'Commemoration of the moving of the relics of St. Vincent de Paul',
        es: 'Conmemoración del traslado de las reliquias de San Vicente de Paúl',
        fr: 'Commémoration du transfert des reliques de Saint Vincent de Paul',
        la: 'Commemoratio translationis reliquiarum S. Vincentii a Paulo'
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
      es: 'Santa Luisa de Marillac',
      fr: 'Sainte Louise de Marillac',
      la: 'Sancta Ludovica de Marillac'
    },
    subtitle: {
      vi: 'Đồng sáng lập Tu hội Nữ Tử Bác Ái',
      en: 'Co-foundress of the Daughters of Charity',
      es: 'Cofundadora de las Hijas de la Caridad',
      fr: 'Co-fondatrice des Filles de la Charité',
      la: 'Cofundatrix Filiarum Caritatis'
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
        es: `<strong>Biografía</strong>
Santa Luisa de Marillac nació el 12 de agosto de 1591, probablemente en París, en el seno de una familia noble. Nunca conoció a su madre. De joven, deseaba consagrarse a Dios en la vida religiosa, pero su frágil salud se lo impidió. En su lugar, se casó con Antonio Le Gras, secretario de la reina, en 1613. Tuvieron un hijo, Miguel.
Tras la muerte de su esposo en 1625, Luisa atravesó un período de angustia espiritual. Fue durante este tiempo que conoció a San Vicente de Paúl, quien se convirtió en su director espiritual. Bajo su guía, Luisa encontró su verdadera vocación en el servicio a los pobres.
En 1633, junto con San Vicente, Luisa reunió a las primeras jóvenes del campo para formar la Compañía de las Hijas de la Caridad, una comunidad de hermanas sin clausura que vivían entre los pobres para servirles. Luisa formó a las hermanas, organizó su trabajo y viajó por toda Francia estableciendo comunidades para servir a los desamparados, los enfermos, los huérfanos y los abandonados.
Con una inmensa confianza en la Providencia, un intelecto agudo y un corazón lleno de amor, Luisa se convirtió en una gran organizadora de la caridad. Murió en París el 15 de marzo de 1660, pocos meses antes que San Vicente. Fue canonizada por el Papa Pío XI en 1934 y declarada Patrona de los Asistentes Sociales Cristianos por el Papa Juan XXIII en 1960.`,
        fr: `<strong>Biographie</strong>
Sainte Louise de Marillac est née le 12 août 1591, probablement à Paris, dans une famille noble. Elle n'a jamais connu sa mère. Jeune femme, elle désirait se consacrer à Dieu dans la vie religieuse, mais sa santé fragile l'en empêcha. À la place, elle épousa Antoine Le Gras, secrétaire de la reine, en 1613. Ils eurent un fils, Michel.
Après la mort de son mari en 1625, Louise traversa une période de détresse spirituelle. C'est à cette époque qu'elle rencontra saint Vincent de Paul, qui devint son directeur spirituel. Sous sa direction, Louise trouva sa véritable vocation dans le service des pauvres.
En 1633, avec saint Vincent, Louise rassembla les premières filles de la campagne pour former la Compagnie des Filles de la Charité, une communauté de sœurs non cloîtrées qui vivaient au milieu des pauvres pour les servir. Louise forma les sœurs, organisa leur travail et parcourut la France pour établir des communautés au service des démunis, des malades, des orphelins et des abandonnés.
Avec une immense confiance en la Providence, une intelligence vive et un cœur plein d'amour, Louise devint une grande organisatrice de la charité. Elle mourut à Paris le 15 mars 1660, quelques mois avant saint Vincent. Elle fut canonisée par le pape Pie XI en 1934 et déclarée patronne des travailleurs sociaux chrétiens par le pape Jean XXIII en 1960.`,
        la: `<strong>Vita</strong>
Sancta Ludovica de Marillac nata est die 12 Augusti 1591, verisimiliter Lutetiae Parisiorum, in familia nobili. Matrem suam numquam novit. Iuvenis, Deo se in vita religiosa consecrare cupiebat, sed infirma valetudo eam impedivit. Potius, Antonio Le Gras, reginae secretario, anno 1613 nupsit. Unum filium, Michaelem, habuerunt.
Post mortem mariti anno 1625, Ludovica tempus angustiae spiritualis transiit. Hoc tempore Sanctum Vincentium a Paulo convenit, qui eius director spiritualis factus est. Sub eius ductu, Ludovica veram suam vocationem in servitio pauperum invenit.
Anno 1633, cum Sancto Vincentio, Ludovica primas puellas rusticas congregavit ad Societatem Filiarum Caritatis formandam, communitatem sororum non clausuratarum quae inter pauperes vivebant ut eis servirent. Ludovica sorores instituit, opera earum ordinavit et per totam Galliam iter fecit ad communitates instituendas ad egenos, infirmos, orphanos et derelictos adiuvandos.
Cum immensa fiducia in Providentiam, acuto ingenio et corde pleno amore, Ludovica magna caritatis ordinatrix facta est. Lutetiae Parisiorum obiit die 15 Martii 1660, paucis mensibus ante Sanctum Vincentium. A Pio Papa XI anno 1934 canonizata est et a Ioanne Papa XXIII anno 1960 Patronam Operariorum Socialium Christianorum declarata est.`
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
        es: `<strong>MISA</strong>
<strong>Antífona de entrada (Prov 31, 20. 26)</strong>
Alarga su palma al desvalido y tiende sus manos al pobre. Abre su boca a la sabiduría, y su lengua enseña la piedad.
<strong>Oración colecta</strong>
Oh, Dios, Padre de las misericordias, que hiciste de santa Luisa una madre para los pobres, concédenos, te rogamos, que, imitando su caridad, sirvamos a Cristo en nuestros hermanos necesitados y así merezcamos ser parte de tu Reino. Por nuestro Señor Jesucristo, tu Hijo.
<strong>Lectura (Prov 31, 10-13, 19-20, 30-31)</strong>
<em>Lectura del libro de los Proverbios.</em>
Una mujer fuerte, ¿quién la hallará? Vale mucho más que las perlas. Su marido se fía de ella, y no le faltan riquezas. Le trae el bien y no el mal, todos los días de su vida. Busca la lana y el lino, y los trabaja con la destreza de sus manos. Aplica sus manos a la rueca, y sus dedos manejan el huso. Tiende su mano al pobre, y alarga sus brazos al necesitado. Engañosa es la gracia, vana la hermosura; la mujer que teme al Señor, ésa será alabada. Dadle el fruto de sus manos, y que en las puertas la alaben sus obras.
<strong>Salmo responsorial (Sal 34)</strong>
<strong>R. El Señor escucha el clamor de los pobres.</strong>
Bendigo al Señor en todo momento, su alabanza está siempre en mi boca. Mi alma se gloría en el Señor: que los humildes lo escuchen y se alegren. <strong>R.</strong>
Engrandeced conmigo al Señor, ensalcemos juntos su nombre. Consulté al Señor, y me respondió, me libró de todas mis ansias. <strong>R.</strong>
Contempladlo, y quedaréis radiantes, vuestro rostro no se avergonzará. Si el afligido invoca al Señor, él lo escucha y lo salva de sus angustias. <strong>R.</strong>
<strong>Aclamación del Evangelio (Mt 11, 28)</strong>
Aleluya, aleluya. Venid a mí todos los que estáis cansados y agobiados, y yo os aliviaré, dice el Señor. Aleluya, aleluya.
<strong>Evangelio (Mt 11, 25-30)</strong>
<strong>Lectura del santo Evangelio según san Mateo.</strong>
En aquel tiempo, exclamó Jesús: «Te doy gracias, Padre, Señor de cielo y tierra, porque has escondido estas cosas a los sabios y entendidos y se las has revelado a la gente sencilla. Sí, Padre, así te ha parecido mejor. Todo me lo ha entregado mi Padre, y nadie conoce al Hijo más que el Padre, y nadie conoce al Padre sino el Hijo y aquel a quien el Hijo se lo quiera revelar. Venid a mí todos los que estáis cansados y agobiados, y yo os aliviaré. Cargad con mi yugo y aprended de mí, que soy manso y humble de corazón, y encontraréis descanso para vuestras almas. Porque mi yugo es llevadero y mi carga ligera».
<strong>Oración sobre las ofrendas</strong>
Acepta con bondad, Señor, los dones que te presentamos, y concédenos que, llenos del mismo espíritu de caridad con que dotaste a santa Luisa, te sirvamos a ti y a nuestro prójimo. Por Cristo, nuestro Señor.
<strong>Antífona de comunión (Mt 25, 40)</strong>
Dice el Señor: En verdad os digo que cuanto hicisteis a uno de estos mis hermanos más pequeños, a mí me lo hicisteis.
<strong>Oración después de la comunión</strong>
Renovados por el Cuerpo y la Sangre de tu Hijo, te pedimos, Señor, que, siguiendo el ejemplo de santa Luisa, estemos atentos a las necesidades de todos y así nos convirtamos en testigos de tu amor en el mundo. Por Cristo, nuestro Señor.`,
        fr: `<strong>MESSE</strong>
<strong>Antienne d'ouverture (Pr 31, 20. 26)</strong>
Elle ouvre sa main au malheureux et tend les bras au pauvre. Elle ouvre la bouche avec sagesse, et une leçon de bonté est sur sa langue.
<strong>Prière d'ouverture</strong>
Dieu, Père des miséricordes, qui as fait de sainte Louise une mère pour les pauvres, accorde-nous, nous t'en prions, qu'à l'imitation de sa charité, nous servions le Christ dans nos frères et sœurs dans le besoin et méritions ainsi de faire partie de ton Royaume. Par Jésus Christ, ton Fils.
<strong>Lecture (Pr 31, 10-13, 19-20, 30-31)</strong>
<em>Lecture du livre des Proverbes.</em>
Une femme vaillante, qui la trouvera ? Elle est infiniment plus précieuse que les perles. Le cœur de son mari a confiance en elle, et les profits ne lui feront pas défaut. Elle lui fait du bien, et non du mal, tous les jours de sa vie. Elle se procure de la laine et du lin, et travaille d'une main joyeuse. Elle met la main à la quenouille, et ses doigts tiennent le fuseau. Elle tend la main au malheureux, et ouvre ses bras à l'indigent. La grâce est trompeuse, et la beauté est vaine ; la femme qui craint le Seigneur est celle qui sera louée. Donnez-lui du fruit de ses mains, et qu'aux portes ses œuvres la louent.
<strong>Psaume responsorial (Ps 34)</strong>
<strong>R. Le Seigneur entend le cri des pauvres.</strong>
Je bénirai le Seigneur en tout temps, sa louange sans cesse à ma bouche. Je me glorifierai dans le Seigneur : que les pauvres m'entendent et soient en fête ! <strong>R.</strong>
Magnifiez avec moi le Seigneur, exaltons tous ensemble son nom. J'ai cherché le Seigneur, il m'a répondu, et de toutes mes frayeurs il m'a délivré. <strong>R.</strong>
Qui regarde vers lui resplendira, sans ombre ni trouble au visage. Un pauvre crie, le Seigneur entend, et il le sauve de toutes ses angoisses. <strong>R.</strong>
<strong>Acclamation de l'Évangile (Mt 11, 28)</strong>
Alléluia, alléluia. Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos, dit le Seigneur. Alléluia, alléluia.
<strong>Évangile (Mt 11, 25-30)</strong>
<strong>Lecture du saint Évangile selon saint Matthieu.</strong>
En ce temps-là, Jésus prit la parole et dit : « Père, Seigneur du ciel et de la terre, je proclame ta louange : ce que tu as caché aux sages et aux savants, tu l'as révélé aux tout-petits. Oui, Père, tu l'as voulu ainsi dans ta bienveillance. Tout m'a été remis par mon Père ; personne ne connaît le Fils, sinon le Père, et personne ne connaît le Père, sinon le Fils, et celui à qui le Fils veut le révéler. Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos. Prenez sur vous mon joug, devenez mes disciples, car je suis doux et humble de cœur, et vous trouverez le repos pour votre âme. Oui, mon joug est facile à porter, et mon fardeau, léger. »
<strong>Prière sur les offrandes</strong>
Accepte avec bonté, Seigneur, les dons que nous t'apportons, et accorde-nous, remplis du même esprit de charité dont tu as doté sainte Louise, de te servir, toi et notre prochain. Par le Christ, notre Seigneur.
<strong>Antienne de la communion (Mt 25, 40)</strong>
Le Seigneur dit : Amen, je vous le dis, chaque fois que vous l'avez fait à l'un de ces plus petits de mes frères, c'est à moi que vous l'avez fait.
<strong>Prière après la communion</strong>
Renouvelés par le Corps et le Sang de ton Fils, nous te prions, Seigneur, qu'à l'exemple de sainte Louise, nous soyons attentifs aux besoins de tous et devenions ainsi témoins de ton amour dans le monde. Par le Christ, notre Seigneur.`,
        la: `<strong>MISSA</strong>
<strong>Antiphona ad introitum (Pr 31, 20. 26)</strong>
Manum suam aperuit inopi et palmas suas extendit ad pauperem. Os suum aperuit sapientiae, et lex clementiae in lingua eius.
<strong>Collecta</strong>
Deus, Pater misericordiarum, qui sanctam Ludovicam matrem pauperibus fecisti, concede, quaesumus, ut, eius caritatem imitantes, Christo in fratribus nostris egentibus serviamus et sic regni tui participes esse mereamur. Per Dominum nostrum Iesum Christum Filium tuum.
<strong>Lectio (Pr 31, 10-13, 19-20, 30-31)</strong>
<em>Lectio libri Proverbiorum.</em>
Mulierem fortem quis inveniet? Procul et de ultimis finibus pretium eius. Confidit in ea cor viri sui et spoliis non indigebit. Reddet ei bonum et non malum omnibus diebus vitae suae. Quaesivit lanam et linum et operata est consilio manuum suarum. Manum suam misit ad fortia, et digiti eius apprehenderunt fusum. Manum suam aperuit inopi et palmas suas extendit ad pauperem. Fallax gratia et vana est pulchritudo; mulier timens Dominum, ipsa laudabitur. Date ei de fructu manuum suarum, et laudent eam in portis opera eius.
<strong>Psalmus responsorius (Ps 34)</strong>
<strong>R. Dominus exaudit clamorem pauperum.</strong>
Benedicam Dominum in omni tempore; semper laus eius in ore meo. In Domino laudabitur anima mea; audiant mansueti et laetentur. <strong>R.</strong>
Magnificate Dominum mecum, et exaltemus nomen eius in idipsum. Exquisivi Dominum, et exaudivit me, et ex omnibus tribulationibus meis eripuit me. <strong>R.</strong>
Accedite ad eum et illuminamini, et facies vestrae non confundentur. Iste pauper clamavit, et Dominus exaudivit eum, et de omnibus tribulationibus eius salvavit eum. <strong>R.</strong>
<strong>Acclamatio ad Evangelium (Mt 11, 28)</strong>
Alleluia, alleluia. Venite ad me, omnes, qui laboratis et onerati estis, et ego reficiam vos, dicit Dominus. Alleluia, alleluia.
<strong>Evangelium (Mt 11, 25-30)</strong>
<strong>Lectio sancti Evangelii secundum Matthaeum.</strong>
In illo tempore respondens Iesus dixit: «Confiteor tibi, Pater, Domine caeli et terrae, quia abscondisti haec a sapientibus et prudentibus et revelasti ea parvulis. Ita, Pater, quoniam sic fuit placitum ante te. Omnia mihi tradita sunt a Patre meo; et nemo novit Filium nisi Pater, neque Patrem quis novit nisi Filius et cui voluerit Filius revelare. Venite ad me, omnes, qui laboratis et onerati estis, et ego reficiam vos. Tollite iugum meum super vos et discite a me, quia mitis sum et humilis corde, et invenietis requiem animabus vestris. Iugum enim meum suave est, et onus meum leve».
<strong>Oratio super oblata</strong>
Oblata, Domine, munera benigne suscipe, et concede, ut eodem caritatis spiritu, quo sanctam Ludovicam implevisti, tibi et proximo serviamus. Per Christum Dominum nostrum.
<strong>Antiphona ad communionem (Mt 25, 40)</strong>
Dicit Dominus: Amen dico vobis: Quamdiu fecisteis uni de his fratribus meis minimis, mihi fecisteis.
<strong>Post communionem</strong>
Corpore et Sanguine Filii tui refecti, quaesumus, Domine, ut, exemplo sanctae Ludovicae, omnium necessitatibus attenti, testes tui in mundo amoris efficiamur. Per Christum Dominum nostrum.`
      },
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'bl-charles-dominique-albini',
    date: '05-21',
    title: {
        vi: 'Chân phước Sác-lơ Đô-mi-nic An-bi-ni',
        en: 'Bl. Charles-Dominique Albini',
        es: 'Beato Carlos Domingo Albini',
        fr: 'Bienheureux Charles-Dominique Albini',
        la: 'Beatus Carolus Dominicus Albini'
    },
    subtitle: {
        vi: 'Linh mục',
        en: 'Priest',
        es: 'Sacerdote',
        fr: 'Prêtre',
        la: 'Sacerdos'
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
    id: 'st-joan-antide-thouret',
    date: '05-23',
    title: {
        vi: 'Thánh Nữ Gio-an An-ti-đơ Tu-rê',
        en: 'St. Joan Antide Thouret',
        es: 'Santa Juana Antida Thouret',
        fr: 'Sainte Jeanne-Antide Thouret',
        la: 'Sancta Ioanna Antida Thouret'
    },
    subtitle: {
        vi: 'Nữ tu, Sáng lập Dòng Nữ Tử Bác Ái Besançon',
        en: 'Religious, Foundress of the Sisters of Charity of Besançon',
        es: 'Religiosa, Fundadora de las Hermanas de la Caridad de Besanzón',
        fr: 'Religieuse, Fondatrice des Sœurs de la Charité de Besançon',
        la: 'Religiosa, Fundatrix Sororum Caritatis Vesuntionensium'
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
    id: 'bl-marta-anna-wiecka',
    date: '05-30',
    title: {
        vi: 'Chân phước Mác-ta An-na Viek-ca',
        en: 'Bl. Marta Anna Wiecka',
        es: 'Beata Marta Ana Wiecka',
        fr: 'Bienheureuse Marta Anna Wiecka',
        la: 'Beata Martha Anna Wiecka'
    },
    subtitle: {
        vi: 'Nữ Tử Bác Ái',
        en: 'Daughter of Charity',
        es: 'Hija de la Caridad',
        fr: 'Fille de la Charité',
        la: 'Filia Caritatis'
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
    id: 'bl-justin-de-jacobis',
    date: '07-31',
    title: {
      vi: 'Chân phước Gius-ti-nô đờ Gia-cô-bít',
      en: 'Bl. Justin de Jacobis',
      es: 'Beato Justino de Jacobis',
      fr: 'Bienheureux Justin de Jacobis',
      la: 'Beatus Iustinus de Iacobis'
    },
    subtitle: {
      vi: 'Giám mục',
      en: 'Bishop',
      es: 'Obispo',
      fr: 'Évêque',
      la: 'Episcopus'
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
    id: 'bl-ceferino-gimenez-malla',
    date: '08-04',
    title: {
      vi: 'Chân phước Ceferino Giménez Malla',
      en: 'Bl. Ceferino Giménez Malla',
      es: 'Beato Ceferino Giménez Malla',
      fr: 'Bienheureux Ceferino Giménez Malla',
      la: 'Beatus Ceferinus Giménez Malla'
    },
    subtitle: {
      vi: 'Giáo dân, Tử đạo',
      en: 'Layman, Martyr',
      es: 'Laico, Mártir',
      fr: 'Laïc, Martyr',
      la: 'Laicus, Martyr'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: '<strong>Tiểu sử</strong><br>Còn được gọi là "El Pelé", ngài là một người Romani Tây Ban Nha, một nhà buôn ngựa và là một người Công giáo sùng đạo. Là thành viên của Hiệp hội Thánh Vinh Sơn Phaolô, ngài nổi tiếng về sự trung thực, lòng bác ái và đức tin sâu sắc. Trong Nội chiến Tây Ban Nha, ngài bị bắt vì bảo vệ một linh mục và bị xử tử vì từ chối chối bỏ đức tin của mình, tay cầm một tràng chuỗi Mân Côi. Ngài là người Romani đầu tiên được phong chân phước và là thánh bổn mạng cho dân tộc của ngài.',
        en: '<strong>Biography</strong><br>Known as "El Pelé," he was a Spanish Romani, a horse trader, and a devout Catholic. A member of the Society of St. Vincent de Paul, he was known for his honesty, charity, and deep faith. During the Spanish Civil War, he was arrested for defending a priest and was executed for refusing to renounce his faith, holding a rosary in his hand. He is the first Romani person to be beatified and serves as a patron for his people.',
        es: '<strong>Biografía</strong><br>Conocido como "El Pelé", fue un gitano español, tratante de caballos y católico devoto. Miembro de la Sociedad de San Vicente de Paúl, era conocido por su honestidad, caridad y profunda fe. Durante la Guerra Civil Española, fue arrestado por defender a un sacerdote y fue ejecutado por negarse a renunciar a su fe, sosteniendo un rosario en su mano. Es la primera persona de etnia gitana en ser beatificada y sirve como patrón para su pueblo.',
        fr: '<strong>Biographie</strong><br>Connu sous le nom de "El Pelé", il était un Rom espagnol, marchand de chevaux et fervent catholique. Membre de la Société de Saint-Vincent-de-Paul, il était connu pour son honnêteté, sa charité et sa foi profonde. Pendant la guerre civile espagnole, il fut arrêté pour avoir défendu un prêtre et fut exécuté pour avoir refusé de renoncer à sa foi, un chapelet à la main. Il est le premier Rom à être béatifié et sert de patron à son peuple.',
        la: '<strong>Vita</strong><br>Cognomento "El Pelé" notus, fuit Hispanus e gente Romani, equorum mercator et catholicus devotus. Societatis Sancti Vincentii a Paulo sodalis, honestate, caritate et fide profunda innotuit. Inter Bellum Civile Hispanicum, pro defensione sacerdotis comprehensus est et, quia fidem suam abnegare recusavit, manu sua rosarium tenens, supplicio affectus est. Primus est ex gente Romani beatificatus et patronus populi sui colitur.'
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
    id: 'bl-ghebre-michael',
    date: '08-30',
    title: {
        vi: 'Chân phước Ghèbre Michael',
        en: 'Bl. Ghebre Michael',
        es: 'Beato Ghebre Michael',
        fr: 'Bienheureux Ghebre Michael',
        la: 'Beatus Ghebre Michael'
    },
    subtitle: {
        vi: 'Linh mục, Tử đạo',
        en: 'Priest, Martyr',
        es: 'Sacerdote, Mártir',
        fr: 'Prêtre, Martyr',
        la: 'Sacerdos, Martyr'
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
    id: 'bl-louis-joseph-francois',
    date: '09-02',
    title: {
        vi: 'Chân phước Lu-i Giu-se Phan-xi-cô và các bạn tử đạo',
        en: 'Bl. Louis-Joseph François and Companions, Martyrs',
        es: 'Beatos Luis José François y Compañeros, Mártires',
        fr: 'Bienheureux Louis-Joseph François et compagnons, Martyrs',
        la: 'Beati Ludovicus Iosephus François et Socii Martyres'
    },
    subtitle: {
        vi: 'Các linh mục Tu hội Truyền giáo, tử đạo',
        en: 'Priests of the Congregation of the Mission, Martyrs',
        es: 'Sacerdotes de la Congregación de la Misión, Mártires',
        fr: 'Prêtres de la Congrégation de la Mission, Martyrs',
        la: 'Sacerdotes Congregationis Missionis, Martyres'
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
    id: 'bl-vincentian-martyrs-spain',
    date: '09-06',
    title: {
        vi: 'Các Chân phước Tử đạo Vinh Sơn tại Tây Ban Nha',
        en: 'Blessed Vincentian Martyrs of Spain',
        es: 'Beatos Mártires Vicencianos de España',
        fr: 'Bienheureux Martyrs Vincentiens d\'Espagne',
        la: 'Beati Martyres Vincentiani Hispaniae'
    },
    subtitle: {
        vi: 'Linh mục, Tu sĩ, Nữ tu và Giáo dân',
        en: 'Priests, Brothers, Sisters and Laity',
        es: 'Sacerdotes, Hermanos, Hermanas y Laicos',
        fr: 'Prêtres, Frères, Sœurs et Laïcs',
        la: 'Sacerdotes, Fratres, Sorores et Laici'
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
    id: 'bl-frederic-ozanam',
    date: '09-09',
    title: {
      vi: 'Chân phước Frê-đê-ric Ô-za-nam',
      en: 'Bl. Frederic Ozanam',
      es: 'Beato Federico Ozanam',
      fr: 'Bienheureux Frédéric Ozanam',
      la: 'Beatus Fridericus Ozanam'
    },
    subtitle: {
      vi: 'Giáo dân',
      en: 'Layman',
      es: 'Laico',
      fr: 'Laïc',
      la: 'Laicus'
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
    id: 'st-john-gabriel-perboyre',
    date: '09-11',
    title: {
      vi: 'Thánh Gio-an Ga-bri-en Péc-boa',
      en: 'St. John Gabriel Perboyre',
      es: 'San Juan Gabriel Perboyre',
      fr: 'Saint Jean-Gabriel Perboyre',
      la: 'Sanctus Ioannes Gabriel Perboyre'
    },
    subtitle: {
      vi: 'Linh mục, Tử đạo',
      en: 'Priest, Martyr',
      es: 'Sacerdote, Mártir',
      fr: 'Prêtre, Martyr',
      la: 'Sacerdos, Martyr'
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
    id: 'st-vincent-de-paul',
    date: '09-27',
    title: {
      vi: 'Thánh Vinh-Sơn Phao-lô',
      en: 'St. Vincent de Paul',
      es: 'San Vicente de Paúl',
      fr: 'Saint Vincent de Paul',
      la: 'Sanctus Vincentius a Paulo'
    },
    subtitle: {
      vi: 'Linh mục, Sáng lập Tu hội Truyền giáo và Nữ Tử Bác Ái',
      en: 'Priest, Founder of the Congregation of the Mission and the Daughters of Charity',
      es: 'Sacerdote, Fundador de la Congregación de la Misión y de las Hijas de la Caridad',
      fr: 'Prêtre, Fondateur de la Congrégation de la Mission et des Filles de la Charité',
      la: 'Sacerdos, Fundator Congregationis Missionis et Filiarum Caritatis'
    },
    type: 'Đại lễ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
Thánh Vinh Sơn Phaolô sinh năm 1581 tại làng Pouy, nước Pháp, trong một gia đình nông dân nghèo. Với trí thông minh và lòng đạo đức, ngài được gửi đi học và thụ phong linh mục năm 1600.
Những năm đầu đời linh mục của ngài đầy biến động, bao gồm cả việc bị cướp biển bắt và bán làm nô lệ ở Tunis. Sau khi thoát khỏi, ngài trở về Pháp và bắt đầu nhận ra ơn gọi sâu sắc của mình là phục vụ người nghèo. Ngài làm tuyên úy cho các gia đình quý tộc, nhưng trái tim ngài luôn hướng về những người bị bỏ rơi.
Năm 1617, tại Folleville, ngài nhận thấy sự thiếu thốn về mặt thiêng liêng của dân chúng nông thôn, một kinh nghiệm đã thúc đẩy ngài thành lập các hội Truyền giáo. Năm 1625, ngài chính thức thành lập Tu hội Truyền giáo (còn gọi là các cha Lazarist hay Vincentians) với mục đích rao giảng Tin Mừng cho người nghèo ở nông thôn và đào tạo hàng giáo sĩ.
Nhận thấy nhu cầu của những người nghèo khổ và bệnh tật trong các thành phố, ngài đã cùng với Thánh Lu-y-sa đờ Ma-ri-lắc thành lập Tu hội Nữ Tử Bác Ái vào năm 1633. Đây là một hình thức tu trì mới mẻ, nơi các nữ tu sống giữa đời để phục vụ những người khốn khổ nhất.
Thánh Vinh Sơn được biết đến như là "Người Cha của người nghèo" và là một nhà tổ chức bác ái vĩ đại. Ngài đã thành lập vô số công cuộc bác ái: giúp đỡ trẻ bị bỏ rơi, chăm sóc bệnh nhân, cứu trợ nạn nhân chiến tranh, phục vụ các tù nhân khổ sai.
Ngài qua đời tại Paris vào ngày 27 tháng 9 năm 1660. Tinh thần bác ái và sự phục vụ người nghèo của ngài đã lan rộng khắp thế giới qua các tu hội và tổ chức do ngài sáng lập. Ngài được Đức Giáo Hoàng Bênêđictô XIII phong thánh năm 1737 và được Đức Giáo Hoàng Lêô XIII tôn làm bổn mạng các Hội Bác ái.`,
        en: `<strong>Biography</strong>
St. Vincent de Paul was born in 1581 in the village of Pouy, France, to a poor peasant family. With his intelligence and piety, he was sent to study and was ordained a priest in 1600.
His early years as a priest were tumultuous, including being captured by pirates and sold into slavery in Tunis. After his escape, he returned to France and began to recognize his deep calling to serve the poor. He served as a chaplain to noble families, but his heart was always with the abandoned.
In 1617, in Folleville, he recognized the spiritual destitution of the country people, an experience that prompted him to establish Missions. In 1625, he officially founded the Congregation of the Mission (also known as the Lazarists or Vincentians) with the purpose of evangelizing the rural poor and training clergy.
Seeing the needs of the sick and poor in the cities, he, along with St. Louise de Marillac, founded the Company of the Daughters of Charity in 1633. This was a new form of religious life, where the sisters lived in the world to serve the most miserable.
St. Vincent became known as "The Father of the Poor" and a great organizer of charity. He established countless charitable works: helping abandoned children, caring for the sick, providing relief to war victims, and serving galley slaves.
He died in Paris on September 27, 1660. His spirit of charity and service to the poor has spread throughout the world through the congregations and organizations he founded. He was canonized by Pope Benedict XIII in 1737 and declared Patron of all works of charity by Pope Leo XIII.`,
        es: `<strong>Biografía</strong>
San Vicente de Paúl nació en 1581 en el pueblo de Pouy, Francia, en una familia de campesinos pobres. Con su inteligencia y piedad, fue enviado a estudiar y fue ordenado sacerdote en 1600.
Sus primeros años como sacerdote fueron tumultuosos, incluyendo su captura por piratas y su venta como esclavo en Túnez. Tras su escape, regresó a Francia y comenzó a reconocer su profunda vocación de servir a los pobres. Sirvió como capellán de familias nobles, pero su corazón siempre estuvo con los abandonados.
En 1617, en Folleville, reconoció la miseria espiritual de la gente del campo, una experiencia que lo impulsó a establecer Misiones. En 1625, fundó oficialmente la Congregación de la Misión (también conocidos como Lazaristas o Vicencianos) con el propósito de evangelizar a los pobres del campo y formar al clero.
Viendo las necesidades de los enfermos y pobres en las ciudades, él, junto con Santa Luisa de Marillac, fundó la Compañía de las Hijas de la Caridad en 1633. Esta fue una nueva forma de vida religiosa, donde las hermanas vivían en el mundo para servir a los más desdichados.
San Vicente se hizo conocido como "El Padre de los Pobres" y un gran organizador de la caridad. Estableció innumerables obras de caridad: ayudar a niños abandonados, cuidar a los enfermos, proporcionar alivio a las víctimas de la guerra y servir a los galeotes.
Murió en París el 27 de septiembre de 1660. Su espíritu de caridad y servicio a los pobres se ha extendido por todo el mundo a través de las congregaciones y organizaciones que fundó. Fue canonizado por el Papa Benedicto XIII en 1737 y declarado Patrono de todas las obras de caridad por el Papa León XIII.`,
        fr: `<strong>Biographie</strong>
Saint Vincent de Paul est né en 1581 dans le village de Pouy, en France, dans une famille de paysans pauvres. Doué d'intelligence et de piété, il fut envoyé étudier et fut ordonné prêtre en 1600.
Ses premières années de sacerdoce furent tumultueuses, y compris sa capture par des pirates et sa vente comme esclave à Tunis. Après son évasion, il retourna en France et commença à reconnaître sa profonde vocation de servir les pauvres. Il fut aumônier de familles nobles, mais son cœur était toujours avec les abandonnés.
En 1617, à Folleville, il prit conscience de la misère spirituelle des gens de la campagne, une expérience qui le poussa à établir des Missions. En 1625, il fonda officiellement la Congrégation de la Mission (également connue sous le nom de Lazaristes ou Vincentiens) dans le but d'évangéliser les pauvres des campagnes et de former le clergé.
Voyant les besoins des malades et des pauvres dans les villes, il fonda, avec sainte Louise de Marillac, la Compagnie des Filles de la Charité en 1633. C'était une nouvelle forme de vie religieuse, où les sœurs vivaient dans le monde pour servir les plus misérables.
Saint Vincent devint connu comme "Le Père des Pauvres" et un grand organisateur de la charité. Il créa d'innombrables œuvres de charité : aide aux enfants abandonnés, soins aux malades, secours aux victimes de la guerre et service des galériens.
Il mourut à Paris le 27 septembre 1660. Son esprit de charité et de service aux pauvres s'est répandu dans le monde entier à travers les congrégations et les organisations qu'il a fondées. Il fut canonisé par le pape Benoît XIII en 1737 et déclaré Patron de toutes les œuvres de charité par le pape Léon XIII.`,
        la: `<strong>Vita</strong>
Sanctus Vincentius a Paulo natus est anno 1581 in vico Pouy, in Gallia, ex familia paupere rustica. Intellectu et pietate praeditus, ad studia missus est et anno 1600 sacerdos ordinatus est.
Primi anni sacerdotii eius tumultuosi fuerunt, inter quos a piratis captus et in Tunete in servitutem venditus est. Postquam effugit, in Galliam rediit et profundam suam vocationem ad serviendum pauperibus agnoscere coepit. Cappellanus familiis nobilibus inservivit, sed cor eius semper cum derelictis erat.
Anno 1617, in Folleville, spiritualem egestatem rusticorum agnovit, quae experientia eum ad Missiones instituendas impulit. Anno 1625, Congregationem Missionis (etiam Lazaristas vel Vincentianos dictam) officialiter fundavit, eo consilio ut pauperes rusticos evangelizaret et clerum institueret.
Necessitates infirmorum et pauperum in urbibus videns, una cum Sancta Ludovica de Marillac, Societatem Filiarum Caritatis anno 1633 fundavit. Haec nova forma vitae religiosae fuit, ubi sorores in saeculo vivebant ut miserrimis servirent.
Sanctus Vincentius "Pater Pauperum" et magnus caritatis ordinator notus factus est. Innumerabilia opera caritatis instituit: auxilium pueris derelictis, curam infirmorum, subsidium victimis belli et servitium in triremibus damnatorum.
Lutetiae Parisiorum obiit die 27 Septembris 1660. Spiritus eius caritatis et servitii erga pauperes per congregationes et societates ab eo fundatas in toto orbe diffusus est. A Benedicto Papa XIII anno 1737 canonizatus est et a Leone Papa XIII Patronus omnium operum caritatis declaratus est.`
      },
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>
<strong>Ca nhập lễ (Lc 4, 18)</strong>
Thần Khí Chúa ngự trên tôi, vì Chúa đã xức dầu tấn phong tôi, để tôi loan báo Tin Mừng cho kẻ nghèo hèn.
<strong>Lời nguyện nhập lễ</strong>
Lạy Thiên Chúa toàn năng hằng hữu, Chúa đã ban cho thánh Vinh Sơn linh mục lòng nhân ái của Chúa, để ngài chăm lo cho người nghèo và đào tạo hàng giáo sĩ. Xin cho chúng con, khi thấm nhuần tinh thần của ngài, cũng biết yêu mến những gì ngài đã yêu mến, và thực hành những gì ngài đã dạy. Chúng con cầu xin.
<strong>Bài đọc (1 Cr 1, 26-31)</strong>
<em>Bài trích thư thứ nhất của thánh Phaolô tông đồ gửi tín hữu Côrintô.</em>
Thưa anh em, anh em thử nghĩ lại xem: khi anh em được Chúa kêu gọi, thì trong anh em đâu có mấy người khôn ngoan về phần xác, đâu có mấy người quyền thế, mấy người quý phái. Song những gì thế gian cho là điên dại, thì Thiên Chúa đã chọn để hạ nhục những kẻ khôn ngoan, và những gì thế gian cho là yếu kém, thì Thiên Chúa đã chọn để hạ nhục những kẻ hùng mạnh; những gì thế gian cho là hèn mạt không đáng kể, là không có, thì Thiên Chúa đã chọn để hủy diệt những gì hiện có, hầu không một phàm nhân nào dám tự phụ trước mặt Người. Phần anh em, chính nhờ Thiên Chúa mà anh em được hiện hữu trong Đức Kitô Giêsu, Đấng đã trở nên sự khôn ngoan của chúng ta, sự khôn ngoan đến từ Thiên Chúa, Đấng đã làm cho chúng ta được công chính, được thánh hóa và cứu chuộc. Như vậy, đúng như lời đã chép: Ai tự hào thì hãy tự hào trong Chúa.
<strong>Đáp ca (Tv 111)</strong>
<strong>Đ. Phúc thay người biết thương xót và cho vay mượn.</strong>
Phúc thay người sợ Chúa, hằng vui thú với lề luật Người. Giống dõi người sẽ hùng cường trên mặt đất, dòng dõi kẻ ngay lành được Chúa thương giáng phúc. <strong>Đ.</strong>
Người nhân hậu thì gặp được may mắn, vì biết đắn đo cân nhắc mọi việc mình làm. Người công chính sẽ không bao giờ nao núng, và được muôn đời ghi nhớ. <strong>Đ.</strong>
Lòng nhân hậu, người chia cơm sẻ áo cho người nghèo khó. Đức công chính của người tồn tại muôn đời, và uy thế người vươn cao rực rỡ. <strong>Đ.</strong>
<strong>Tung hô Tin Mừng (Lc 4, 18)</strong>
Ha-lê-lu-i-a. Ha-lê-lu-i-a. Chúa đã sai tôi đi loan báo Tin Mừng cho người nghèo, công bố cho kẻ bị giam cầm biết họ được tha, cho người mù biết họ được sáng mắt. Ha-lê-lu-i-a.
<strong>Tin Mừng (Mt 25, 31-40)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu.</strong>
Khi ấy, Đức Giêsu nói với các môn đệ rằng: “Khi Con Người đến trong vinh quang của Người, có tất cả các thiên sứ theo hầu, bấy giờ Người sẽ ngự trên ngai vinh hiển của Người. Các dân thiên hạ sẽ được tập hợp cả lại trước mặt Người, và Người sẽ tách riêng họ ra, như mục tử tách biệt chiên với dê. Người sẽ cho chiên đứng bên phải Người, còn dê ở bên trái. Bấy giờ Đức Vua sẽ phán cùng những người ở bên phải rằng: “Nào những kẻ Cha Ta chúc phúc, hãy đến thừa hưởng Vương Quốc dọn sẵn cho các ngươi ngay từ thuở tạo thiên lập địa. Vì xưa Ta đói, các ngươi đã cho ăn; Ta khát, các ngươi đã cho uống; Ta là khách lạ, các ngươi đã tiếp rước; Ta trần truồng, các ngươi đã cho mặc; Ta đau yếu, các ngươi đã thăm viếng; Ta ngồi tù, các ngươi đến hỏi han”. Bấy giờ những người công chính sẽ thưa rằng: “Lạy Chúa, có bao giờ chúng con đã thấy Chúa đói mà cho ăn, khát mà cho uống; có bao giờ đã thấy Chúa là khách lạ mà tiếp rước; hoặc trần truồng mà cho mặc? Có bao giờ chúng con đã thấy Chúa đau yếu hoặc ngồi tù, mà đến hỏi han đâu?”. Đức Vua sẽ đáp lại rằng: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”.
<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin thương nhận lễ vật chúng con dâng trong ngày lễ kính thánh Vinh Sơn, và cho chúng con biết noi gương ngài, hiến dâng trọn cả cuộc đời để làm vinh danh Chúa và cứu độ muôn dân. Chúng con cầu xin.
<strong>Ca hiệp lễ (Tv 9, 10)</strong>
Chúa là nơi ẩn náu cho người bị áp bức, là nơi nương tựa trong lúc gian truân.
<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, chúng con vừa cử hành hy lễ tình yêu của Đức Kitô. Xin cho chúng con, trong ngày lễ kính thánh Vinh Sơn, được đầy tràn sức mạnh của bí tích này, để luôn sẵn sàng loan báo Tin Mừng cho người nghèo. Chúng con cầu xin.`,
        en: `<strong>MASS</strong>
<strong>Entrance Antiphon (Lk 4:18)</strong>
The Spirit of the Lord is upon me, for he has anointed me to bring good news to the poor.
<strong>Collect</strong>
O God, who for the relief of the poor and the formation of the clergy endowed the Priest Saint Vincent de Paul with apostolic virtues, grant, we pray, that, afire with that same spirit, we may love what he loved and put into practice what he taught. Through our Lord Jesus Christ, your Son.
<strong>Reading (1 Cor 1:26-31)</strong>
<em>A reading from the first Letter of Saint Paul to the Corinthians.</em>
Consider your own calling, brothers. Not many of you were wise by human standards, not many were powerful, not many were of noble birth. Rather, God chose the foolish of the world to shame the wise, and God chose the weak of the world to shame the strong, and God chose the lowly and despised of the world, those who count for nothing, to reduce to nothing those who are something, so that no human being might boast before God. It is due to him that you are in Christ Jesus, who became for us wisdom from God, as well as righteousness, sanctification, and redemption, so that, as it is written, “Whoever boasts, should boast in the Lord.”
<strong>Responsorial Psalm (Ps 112)</strong>
<strong>R. Blessed the man who is gracious and lends to those in need.</strong>
Blessed the man who fears the LORD, who greatly delights in his commands. His descendants shall be mighty in the land, the generation of the upright will be blessed. <strong>R.</strong>
Well for the man who is gracious and lends, who conducts his affairs with justice. He shall never be moved; the just one shall be in everlasting remembrance. <strong>R.</strong>
Lavishly he gives to the poor; his generosity shall endure forever; his horn shall be exalted in glory. <strong>R.</strong>
<strong>Gospel Acclamation (Lk 4:18)</strong>
Alleluia, alleluia. The Lord sent me to bring glad tidings to the poor and to proclaim liberty to captives. Alleluia, alleluia.
<strong>Gospel (Mt 25:31-40)</strong>
<strong>A reading from the holy Gospel according to Matthew.</strong>
Jesus said to his disciples: “When the Son of Man comes in his glory, and all the angels with him, he will sit upon his glorious throne, and all the nations will be assembled before him. And he will separate them one from another, as a shepherd separates the sheep from the goats. He will place the sheep on his right and the goats on his left. Then the king will say to those on his right, ‘Come, you who are blessed by my Father. Inherit the kingdom prepared for you from the foundation of the world. For I was hungry and you gave me food, I was thirsty and you gave me drink, a stranger and you welcomed me, naked and you clothed me, ill and you cared for me, in prison and you visited me.’ Then the righteous will answer him and say, ‘Lord, when did we see you hungry and feed you, or thirsty and give you drink? When did we see you a stranger and welcome you, or naked and clothe you? When did we see you ill or in prison, and visit you?’ And the king will say to them in reply, ‘Amen, I say to you, whatever you did for one of these least brothers of mine, you did for me.’”
<strong>Prayer over the Offerings</strong>
Accept, O Lord, this sacrifice on the feast of Saint Vincent, and grant that we who celebrate the mystery of the Lord’s passion may imitate what we now enact. Through Christ our Lord.
<strong>Communion Antiphon (Ps 9:10)</strong>
The Lord is a stronghold for the oppressed, a stronghold in times of trouble.
<strong>Prayer after Communion</strong>
Having received the sacrament of salvation, we ask, O Lord, on the feast of Saint Vincent, that we, who have partaken of the one bread, may stand as one in your love, and so bring the Good News to the poor. Through Christ our Lord.`,
        es: `<strong>MISA</strong>
<strong>Antífona de entrada (Lc 4, 18)</strong>
El Espíritu del Señor está sobre mí, porque me ha ungido para anunciar la Buena Nueva a los pobres.
<strong>Oración colecta</strong>
Oh, Dios, que para el alivio de los pobres y la formación del clero dotaste al presbítero san Vicente de Paúl de virtudes apostólicas, concédenos, te rogamos, que, inflamados por ese mismo espíritu, amemos lo que él amó y pongamos en práctica lo que enseñó. Por nuestro Señor Jesucristo, tu Hijo.
<strong>Lectura (1 Cor 1, 26-31)</strong>
<em>Lectura de la primera carta del apóstol san Pablo a los Corintios.</em>
Hermanos, considerad vuestra vocación. No hay muchos sabios según la carne, ni muchos poderosos, ni muchos de noble cuna. Al contrario, Dios eligió lo necio del mundo para avergonzar a los sabios, y Dios eligió lo débil del mundo para avergonzar a los fuertes, y Dios eligió lo vil y despreciado del mundo, lo que no cuenta, para anular a lo que es, para que nadie pueda gloriarse ante Dios. Por él estáis en Cristo Jesús, que se ha hecho para nosotros sabiduría de Dios, justicia, santificación y redención, para que, como está escrito: «El que se gloría, que se gloríe en el Señor».
<strong>Salmo responsorial (Sal 112)</strong>
<strong>R. Dichoso el que se compadece y presta.</strong>
Dichoso el que teme al Señor y ama de corazón sus mandatos. Su linaje será poderoso en la tierra, la descendencia del justo será bendita. <strong>R.</strong>
Dichoso el que se compadece y presta, y administra rectamente sus asuntos. El justo jamás vacilará, su recuerdo será perpetuo. <strong>R.</strong>
Reparte limosna a los pobres; su caridad es constante, sin falta, y alzará la frente con dignidad. <strong>R.</strong>
<strong>Aclamación del Evangelio (Lc 4, 18)</strong>
Aleluya, aleluya. El Señor me ha enviado para dar la Buena Noticia a los pobres, para anunciar la libertad a los cautivos. Aleluya, aleluya.
<strong>Evangelio (Mt 25, 31-40)</strong>
<strong>Lectura del santo Evangelio según san Mateo.</strong>
En aquel tiempo, dijo Jesús a sus discípulos: «Cuando venga en su gloria el Hijo del hombre, y todos los ángeles con él, se sentará en el trono de su gloria y serán reunidas ante él todas las naciones. Él separará a unos de otros, como un pastor separa las ovejas de las cabras. Y pondrá las ovejas a su derecha y las cabras a su izquierda. Entonces dirá el rey a los de su derecha: “Venid, benditos de mi Padre; heredad el reino preparado para vosotros desde la creación del mundo. Porque tuve hambre y me disteis de comer, tuve sed y me disteis de beber, fui forastero y me hospedasteis, estuve desnudo y me vestisteis, enfermo y me visitasteis, en la cárcel y vinisteis a verme”. Entonces los justos le contestarán: “Señor, ¿cuándo te vimos con hambre y te alimentamos, o con sed y te dimos de beber?; ¿cuándo te vimos forastero y te hospedamos, o desnudo y te vestimos?; ¿cuándo te vimos enfermo o en la cárcel y fuimos a verte?”. Y el rey les dirá: “Os aseguro que cada vez que lo hicisteis con uno de estos, mis hermanos más pequeños, conmigo lo hicisteis”».
<strong>Oración sobre las ofrendas</strong>
Acepta, Señor, este sacrificio en la fiesta de san Vicente, y concédenos que, al celebrar el misterio de la pasión del Señor, imitemos lo que ahora realizamos. Por Cristo, nuestro Señor.
<strong>Antífona de comunión (Sal 9, 10)</strong>
El Señor es un baluarte para el oprimido, un baluarte en tiempos de angustia.
<strong>Oración después de la comunión</strong>
Habiendo recibido el sacramento de la salvación, te pedimos, oh Señor, en la fiesta de san Vicente, que nosotros, que hemos participado del único pan, permanezcamos como uno solo en tu amor, y así llevemos la Buena Nueva a los pobres. Por Cristo, nuestro Señor.`,
        fr: `<strong>MESSE</strong>
<strong>Antienne d'ouverture (Lc 4, 18)</strong>
L'Esprit du Seigneur est sur moi, car il m'a oint pour annoncer la Bonne Nouvelle aux pauvres.
<strong>Prière d'ouverture</strong>
Dieu qui, pour le soulagement des pauvres et la formation du clergé, as comblé le prêtre saint Vincent de Paul de vertus apostoliques, accorde-nous, nous t'en prions, qu'enflammés du même esprit, nous aimions ce qu'il a aimé et mettions en pratique ce qu'il a enseigné. Par Jésus Christ, ton Fils.
<strong>Lecture (1 Co 1, 26-31)</strong>
<em>Lecture de la première lettre de saint Paul apôtre aux Corinthiens.</em>
Frères, considérez votre appel. Il n'y a pas parmi vous beaucoup de sages selon la chair, ni beaucoup de puissants, ni beaucoup de gens de haute naissance. Au contraire, ce qu'il y a de fou dans le monde, voilà ce que Dieu a choisi pour couvrir de confusion les sages ; ce qu'il y a de faible dans le monde,`,
      },
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  },
  {
    id: 'all-vincentian-saints',
    date: '11-13',
    title: {
      vi: 'Lễ Các Thánh trong Gia đình Vinh Sơn',
      en: 'Feast of All Saints of the Vincentian Family',
      es: 'Fiesta de Todos los Santos de la Familia Vicenciana',
      fr: 'Fête de Tous les Saints de la Famille Vincentienne',
      la: 'Festum Omnium Sanctorum Familiae Vincentianae'
    },
    subtitle: {
      vi: 'Kính nhớ các Thánh và Chân phước',
      en: 'In memory of all Saints and Blesseds',
      es: 'En memoria de todos los Santos y Beatos',
      fr: 'En mémoire de tous les Saints et Bienheureux',
      la: 'In memoria omnium Sanctorum et Beatorum'
    },
    type: 'Lễ kính',
    sections: {
      biography: {
        vi: '<strong>Tiểu sử</strong><br>Ngày lễ này tôn vinh sự thánh thiện được tìm thấy trong toàn thể Gia đình Vinh Sơn rộng lớn. Lễ này tôn vinh tất cả các vị thánh đã được tuyên thánh, các chân phước, và vô số các thành viên vô danh—linh mục, tu sĩ, nữ tu, và giáo dân—những người đã sống đặc sủng bác ái và truyền giáo của Vinh Sơn với nhân đức anh hùng. Đây là một ngày để tạ ơn vì tấm gương của các ngài và để cầu xin sự chuyển cầu của các ngài khi chúng ta tiếp tục sứ mạng của Thánh Vinh Sơn Phaolô trong việc phục vụ Đức Kitô nơi người nghèo.',
        en: '<strong>Biography</strong><br>This feast celebrates the holiness found throughout the vast Vincentian Family. It honors all the canonized saints, blesseds, and the countless unknown members—priests, brothers, sisters, and laity—who lived the Vincentian charism of charity and evangelization with heroic virtue. It is a day to give thanks for their example and to ask for their intercession as we continue the mission of St. Vincent de Paul in serving Christ in the person of the poor.',
        es: '<strong>Biografía</strong><br>Esta fiesta celebra la santidad que se encuentra en toda la vasta Familia Vicenciana. Honra a todos los santos canonizados, a los beatos y a los innumerables miembros desconocidos —sacerdotes, hermanos, hermanas y laicos— que vivieron el carisma vicenciano de caridad y evangelización con virtud heroica. Es un día para dar gracias por su ejemplo y para pedir su intercesión mientras continuamos la misión de San Vicente de Paúl de servir a Cristo en la persona de los pobres.',
        fr: '<strong>Biographie</strong><br>Cette fête célèbre la sainteté présente dans toute la vaste Famille Vincentienne. Elle honore tous les saints canonisés, les bienheureux et les innombrables membres inconnus —prêtres, frères, sœurs et laïcs— qui ont vécu le charisme vincentien de charité et d\'évangélisation avec une vertu héroïque. C\'est un jour pour rendre grâce pour leur exemple et pour demander leur intercession alors que nous poursuivons la mission de saint Vincent de Paul de servir le Christ en la personne des pauvres.',
        la: '<strong>Vita</strong><br>Hoc festum sanctitatem in tota ampla Familia Vincentiana inventam celebrat. Honorat omnes sanctos canonizatos, beatos, et innumerabiles sodales ignotos —sacerdotes, fratres, sorores et laicos— qui charisma Vincentianum caritatis et evangelizationis cum virtute heroica vixerunt. Dies est ad gratias agendas pro eorum exemplo et ad eorum intercessionem petendam, dum missionem Sancti Vincentii a Paulo in serviendo Christo in persona pauperum continuamus.'
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
    id: 'our-lady-miraculous-medal',
    date: '11-27',
    title: {
      vi: 'Đức Mẹ Ban Ơn (Mẫu Ảnh Hay Làm Phép Lạ)',
      en: 'Our Lady of the Miraculous Medal',
      es: 'Nuestra Señora de la Medalla Milagrosa',
      fr: 'Notre-Dame de la Médaille Miraculeuse',
      la: 'Beata Maria Virgo a Sacro Numismate'
    },
    subtitle: {
      vi: 'Lễ hiện ra của Đức Trinh Nữ Maria',
      en: 'Apparition of the Blessed Virgin Mary',
      es: 'Aparición de la Santísima Virgen María',
      fr: 'Apparition de la Bienheureuse Vierge Marie',
      la: 'Apparitio Beatae Mariae Virginis'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: '<strong>Lịch sử</strong><br>Lễ này kỷ niệm các lần Đức Trinh Nữ Maria hiện ra với Thánh Nữ Ca-ta-ri-na La-bu-rê, một Nữ Tử Bác Ái, vào năm 1830 tại nhà nguyện trên đường Rue du Bac ở Paris. Trong các lần hiện ra này, Mẹ Maria đã tiết lộ mẫu thiết kế của một mẫu ảnh và yêu cầu làm ra nó. Mẫu ảnh này, nay được gọi là Mẫu Ảnh Hay Làm Phép Lạ, có hình Mẹ Maria đứng trên quả địa cầu, với các tia sáng phát ra từ tay Mẹ, và dòng chữ: "Lạy Mẹ Maria vô nhiễm nguyên tội, xin cầu cho chúng con là kẻ chạy đến cùng Mẹ". Mặt sau có hình một cây thánh giá và chữ "M" lồng vào nhau, với Thánh Tâm Chúa Giêsu và Trái Tim Vô Nhiễm Mẹ Maria bên dưới. Mẫu ảnh nhanh chóng lan truyền khắp thế giới, gắn liền với vô số các ơn hoán cải, chữa lành và bảo vệ, do đó có tên gọi phổ biến này. Lòng sùng kính này là trung tâm của linh đạo Gia đình Vinh Sơn.',
        en: '<strong>History</strong><br>This feast commemorates the apparitions of the Blessed Virgin Mary to Saint Catherine Labouré, a Daughter of Charity, in 1830 at the chapel on Rue du Bac in Paris. During these apparitions, Mary revealed the design of a medal and asked that it be struck. The medal, now known as the Miraculous Medal, features Mary standing on a globe, with rays of light streaming from her hands, and the inscription: "O Mary, conceived without sin, pray for us who have recourse to thee." The reverse shows a cross and the letter "M" intertwined, with the Sacred Heart of Jesus and the Immaculate Heart of Mary below. The medal quickly spread throughout the world, associated with numerous conversions, healings, and protections, earning it its popular name. This devotion is central to the spirituality of the Vincentian Family.',
        es: '<strong>Historia</strong><br>Esta fiesta conmemora las apariciones de la Santísima Virgen María a Santa Catalina Labouré, una Hija de la Caridad, en 1830 en la capilla de la Rue du Bac en París. Durante estas apariciones, María reveló el diseño de una medalla y pidió que se acuñara. La medalla, ahora conocida como la Medalla Milagrosa, presenta a María de pie sobre un globo, con rayos de luz que emanan de sus manos, y la inscripción: "Oh María, sin pecado concebida, ruega por nosotros que recurrimos a ti". El reverso muestra una cruz y la letra "M" entrelazadas, con el Sagrado Corazón de Jesús y el Inmaculado Corazón de María debajo. La medalla se difundió rápidamente por todo el mundo, asociada con numerosas conversiones, curaciones y protecciones, ganándose su nombre popular. Esta devoción es central en la espiritualidad de la Familia Vicenciana.',
        fr: '<strong>Histoire</strong><br>Cette fête commémore les apparitions de la Bienheureuse Vierge Marie à sainte Catherine Labouré, une Fille de la Charité, en 1830 à la chapelle de la rue du Bac à Paris. Au cours de ces apparitions, Marie a révélé le dessin d\'une médaille et a demandé qu\'elle soit frappée. La médaille, maintenant connue sous le nom de Médaille Miraculeuse, représente Marie debout sur un globe, des rayons de lumière émanant de ses mains, et l\'inscription : "Ô Marie, conçue sans péché, priez pour nous qui avons recours à vous". Le revers montre une croix et la lettre "M" entrelacées, avec le Sacré-Cœur de Jésus et le Cœur Immaculé de Marie en dessous. La médaille s\'est rapidement répandue dans le monde entier, associée à de nombreuses conversions, guérisons et protections, ce qui lui a valu son nom populaire. Cette dévotion est au cœur de la spiritualité de la Famille Vincentienne.',
        la: '<strong>Historia</strong><br>Hoc festum apparitiones Beatae Mariae Virginis ad Sanctam Catharinam Labouré, Filiam Caritatis, anno 1830 in sacello ad Rue du Bac Lutetiae Parisiorum commemorat. In his apparitionibus, Maria formam numismatis revelavit et ut cuderetur petiit. Numisma, nunc Sacrum Numisma Miraculosum notum, Mariam super globum stantem effingit, cum radiis lucis e manibus eius fluentibus, et inscriptione: "O Maria, sine labe concepta, ora pro nobis qui ad te confugimus". Aversa pars crucem et litteram "M" inter se implexas ostendit, cum Sacratissimo Corde Iesu et Immaculato Corde Mariae infra. Numisma celeriter per orbem terrarum diffusum est, cum plurimis conversionibus, sanationibus et praesidiis coniunctum, unde nomen populare accepit. Haec devotio centralis est in spiritualitate Familiae Vincentianae.'
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
    id: 'st-catherine-laboure',
    date: '11-28',
    title: {
      vi: 'Thánh Nữ Ca-ta-ri-na La-bu-rê',
      en: 'St. Catherine Labouré',
      es: 'Santa Catalina Labouré',
      fr: 'Sainte Catherine Labouré',
      la: 'Sancta Catharina Labouré'
    },
    subtitle: {
      vi: 'Nữ Tử Bác Ái, Thị nhân',
      en: 'Daughter of Charity, Visionary',
      es: 'Hija de la Caridad, Vidente',
      fr: 'Fille de la Charité, Visionnaire',
      la: 'Filia Caritatis, Visionaria'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: '<strong>Tiểu sử</strong><br>Là một Nữ Tử Bác Ái khiêm tốn tại Paris, vào năm 1830, thánh nữ đã được diễm phúc thấy Đức Trinh Nữ Maria hiện ra, và Mẹ đã chỉ dẫn ngài làm một mẫu ảnh. Mẫu ảnh này, được biết đến với tên gọi Mẫu Ảnh Hay Làm Phép Lạ, đã nhanh chóng lan rộng khắp thế giới, trở thành một biểu tượng của đức tin và là nguồn mạch của vô số ân sủng. Thánh Ca-ta-ri-na đã dành phần còn lại của cuộc đời mình để âm thầm phục vụ người già và người bệnh, và những lần được thị kiến của ngài vẫn là một bí mật cho đến khi ngài sắp qua đời.',
        en: '<strong>Biography</strong><br>A humble Daughter of Charity in Paris, in 1830 she received visions of the Blessed Virgin Mary, who instructed her to have a medal created. This medal, known as the Miraculous Medal, spread rapidly throughout the world, becoming a symbol of faith and a source of countless graces. Catherine spent the rest of her life in quiet service to the elderly and sick, her visionary experiences remaining a secret until shortly before her death.',
        es: '<strong>Biografía</strong><br>Humilde Hija de la Caridad en París, en 1830 recibió visiones de la Santísima Virgen María, quien le instruyó que se creara una medalla. Esta medalla, conocida como la Medalla Milagrosa, se difundió rápidamente por todo el mundo, convirtiéndose en un símbolo de fe y una fuente de innumerables gracias. Catalina pasó el resto de su vida en un servicio silencioso a los ancianos y enfermos, manteniendo sus experiencias visionarias en secreto hasta poco antes de su muerte.',
        fr: '<strong>Biographie</strong><br>Humble Fille de la Charité à Paris, elle reçut en 1830 des visions de la Sainte Vierge Marie, qui lui demanda de faire frapper une médaille. Cette médaille, connue sous le nom de Médaille Miraculeuse, se répandit rapidement dans le monde entier, devenant un symbole de foi et une source de grâces innombrables. Catherine passa le reste de sa vie au service discret des personnes âgées et des malades, ses expériences visionnaires restant secrètes jusqu\'à peu de temps avant sa mort.',
        la: '<strong>Vita</strong><br>Humilis Filia Caritatis Lutetiae Parisiorum, anno 1830 apparitiones Beatae Virginis Mariae accepit, quae eam instruxit ut numisma cudendum curaret. Hoc numisma, nomine Numismatis Miraculosi notum, celeriter per totum orbem diffusum est, symbolum fidei et fons gratiarum innumerabilium factum. Catharina reliquam vitam suam in quieto servitio senum et aegrotorum transegit, visionariis suis experimentis usque paulo ante mortem secretis manentibus.'
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
    id: 'founding-dc',
    date: '11-29',
    title: {
      vi: 'Kỷ niệm Thành lập Tu hội Nữ Tử Bác Ái',
      en: 'Commemoration of the Founding of the Daughters of Charity',
      es: 'Conmemoración de la Fundación de las Hijas de la Caridad',
      fr: 'Commémoration de la Fondation des Filles de la Charité',
      la: 'Commemoratio Fundationis Filiarum Caritatis'
    },
    subtitle: {
      vi: 'Ngày 29 tháng 11 năm 1633',
      en: 'November 29, 1633',
      es: '29 de noviembre de 1633',
      fr: '29 novembre 1633',
      la: '29 Novembris 1633'
    },
    type: 'Kỷ niệm',
    sections: {
      biography: {
        vi: '<strong>Lịch sử</strong><br>Vào ngày 29 tháng 11 năm 1633, dưới sự hướng dẫn của Thánh Vinh Sơn Phaolô và Thánh Lu-y-sa đờ Ma-ri-lắc, các Nữ Tử Bác Ái đầu tiên đã dâng hiến cuộc đời mình cho Thiên Chúa để phục vụ những người nghèo nhất trong những người nghèo. Cộng đoàn mới này mang tính cách mạng: họ không phải là các nữ tu dòng kín mà là "những người tôi tớ của người nghèo", những người có "các đường phố của thành thị làm tu viện". Sự thành lập của họ đã đánh dấu một thời điểm quan trọng trong lịch sử đời sống tu trì tông đồ cho phụ nữ trong Giáo Hội.',
        en: '<strong>History</strong><br>On November 29, 1633, under the guidance of St. Vincent de Paul and St. Louise de Marillac, the first Daughters of Charity dedicated their lives to God to serve the poorest of the poor. This new community was revolutionary: they were not cloistered nuns but "servants of the poor" who had "the streets of the city for their cloister." Their foundation marked a pivotal moment in the history of apostolic religious life for women in the Church.',
        es: '<strong>Historia</strong><br>El 29 de noviembre de 1633, bajo la guía de San Vicente de Paúl y Santa Luisa de Marillac, las primeras Hijas de la Caridad dedicaron sus vidas a Dios para servir a los más pobres de los pobres. Esta nueva comunidad fue revolucionaria: no eran monjas de clausura sino "siervas de los pobres" que tenían "las calles de la ciudad por claustro". Su fundación marcó un momento crucial en la historia de la vida religiosa apostólica para las mujeres en la Iglesia.',
        fr: '<strong>Histoire</strong><br>Le 29 novembre 1633, sous la direction de saint Vincent de Paul et de sainte Louise de Marillac, les premières Filles de la Charité consacrèrent leur vie à Dieu pour servir les plus pauvres des pauvres. Cette nouvelle communauté était révolutionnaire : elles n\'étaient pas des religieuses cloîtrées mais des "servantes des pauvres" qui avaient "pour cloître les rues de la ville". Leur fondation marqua un moment décisif dans l\'histoire de la vie religieuse apostolique féminine dans l\'Église.',
        la: '<strong>Historia</strong><br>Die 29 Novembris 1633, sub ductu Sanctorum Vincentii a Paulo et Ludovicae de Marillac, primae Filiae Caritatis vitam suam Deo dicaverunt ad pauperrimos serviendum. Haec nova communitas revolutionaria fuit: non moniales clausurae sed "servae pauperum" erant, quae "plateas civitatis pro claustro" habebant. Fundatio earum momentum praecipuum in historia vitae religiosae apostolicae pro mulieribus in Ecclesia notavit.'
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
    id: 'bl-marcantonio-durando',
    date: '12-10',
    title: {
      vi: 'Chân phước Marcantonio Durando',
      en: 'Bl. Marcantonio Durando',
      es: 'Beato Marcantonio Durando',
      fr: 'Bienheureux Marcantonio Durando',
      la: 'Beatus Marcus Antonius Durando'
    },
    subtitle: {
      vi: 'Linh mục',
      en: 'Priest',
      es: 'Sacerdote',
      fr: 'Prêtre',
      la: 'Sacerdos'
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: '<strong>Tiểu sử</strong><br>Là một linh mục Tu hội Truyền giáo đến từ miền bắc nước Ý, ngài là một nhà truyền giáo và nhà giảng thuyết không mệt mỏi. Vô cùng xúc động trước hoàn cảnh của các thiếu nữ gặp nguy hiểm, ngài đã thành lập Dòng các Nữ tu Nazarene vào năm 1865 để phục vụ họ. Ngài được biết đến với lòng sùng kính sâu sắc Cuộc Thương Khó của Chúa Kitô và sự tận tâm nhiệt thành với sứ mạng Vinh Sơn là phục vụ cả nhu cầu thiêng liêng và vật chất của người nghèo.',
        en: '<strong>Biography</strong><br>A Vincentian priest from northern Italy, he was a tireless missionary and preacher. Deeply moved by the plight of young girls at risk, he founded the Congregation of the Nazarene Sisters in 1865 to serve them. He was known for his profound devotion to the Passion of Christ and his zealous dedication to the Vincentian mission of serving both the spiritual and material needs of the poor.',
        es: '<strong>Biografía</strong><br>Sacerdote vicenciano del norte de Italia, fue un misionero y predicador incansable. Profundamente conmovido por la situación de las jóvenes en riesgo, fundó la Congregación de las Hermanas Nazarenas en 1865 para servirlas. Fue conocido por su profunda devoción a la Pasión de Cristo y su celosa dedicación a la misión vicenciana de servir las necesidades espirituales y materiales de los pobres.',
        fr: '<strong>Biographie</strong><br>Prêtre vincentien du nord de l\'Italie, il fut un missionnaire et un prédicateur infatigable. Profondément ému par le sort des jeunes filles en danger, il fonda la Congrégation des Sœurs Nazaréennes en 1865 pour les servir. Il était connu pour sa profonde dévotion à la Passion du Christ et son dévouement zélé à la mission vincentienne de servir les besoins spirituels et matériels des pauvres.',
        la: '<strong>Vita</strong><br>Sacerdos Vincentianus ex Italia septentrionali, missionarius et praedicator infatigabilis fuit. Profunde commotus sorte puellarum in periculo versantium, Congregationem Sororum Nazarenarum anno 1865 ad eis serviendum condidit. Notus erat ob profundam devotionem suam erga Passionem Christi et zelantem dedicationem missioni Vincentianae, scilicet serviendi necessitatibus tam spiritualibus quam materialibus pauperum.'
      },
      massReadings: placeholder,
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
  }
];