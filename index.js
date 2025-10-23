
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
  // Thánh Ê-li-za-bét An-na Xe-tôn
  {
    id: 'st-elizabeth-ann-seton',
    date: '01-04',
    title: { 
      vi: 'Thánh Nữ Ê-li-za-bét An-na Xe-tôn',
      en: 'St. Elizabeth Ann Seton',
     
    },
    subtitle: {
      vi: 'Nữ tu',
      en: 'Religious',
      
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
    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

  // Chân phước Lin-đan-ba Giút-ta Ô-li-bây-ra
  {
    id: 'bl-lindanba-justa-olibayra',
    date: '01-07',
    title: { 
      vi: 'Chân phước Lin-đan-ba Giút-ta Ô-li-bây-ra',
      en: 'Bl. Lindanba Justa Olibayra',
     
    },
    subtitle: {
      vi: 'Nữ tu',
      en: 'Religious',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>

`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },
  
 // Thánh Phaolô Tông Đồ
  {
    id: 'st-paul-apostle',
    date: '01-25',
    title: { 
      vi: 'Thánh Phaolô Tông Đồ',
      en: 'St. Paul Apostle',
     
    },
    subtitle: {
      vi: 'Kỷ niệm thành lập Tu Hội Truyền Giáo',
      en: 'Commemoration of the Founding of the Congregation of the Mission',
      
    },
    type: 'Lễ kính',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>

`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

 // Chân phước Ma-ri-a An-na Va-i-ô và Ô-đi-la Bôm-gác-tăng
  {
    id: 'bl-maria-anna-vaio-and-odila-bomgactang',
    date: '02-01',
    title: { 
      vi: 'Các chân phước Ma-ri-a An-na Va-i-ô và Ô-đi-la Bôm-gác-tăng',
      en: 'Bl. Marie-Anne Vayo and Odilia Baumgarten',
     
    },
    subtitle: {
      vi: 'Nữ Tử Bác Ái - Tử đạo',
      en: 'Daughters of Charity - Martyrs',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>
Marie-Anne Vayo was born May 13, 1734 in the city of Fontainebleau, near Paris. A month after her birth her father died. Her mother gave Maria a Christian upbringing. Since childhood she had close contact with the Daughters of Mercy, who took care for the poor, the sick and the orphans in her city.  When she was twenty-seven she joined the Congregation of the Daughters of Mercy. On September 25, 1761 she started her formation in Paris. A year later, she was sent by the superiors to serve in the St. Louis Hospital in Fontenay. In 1777 she came to Angers along with her sister Odilia Baumgarten, where she started her work with the sick at Saint-Jean hospital.

Odilia Baumgarten was born on November 15, 1750 in Gondrexang in the east of France in the family of a miller. Her father often told her about St. Vincent and the congregation founded by him.  Odilia first met the Daughters of Mercy in the town of Vic-sur-Seille, where she was simply impressed with their lives and work among the poor. There she decided to join them. On August 4, 1774 in Paris, she started her preparation for life in the Congregation. After a short stay in Brest, in 1777 Odilia was sent to Angers to serve the sick in the Saint-Jean hospital.

In 1789, when the French Revolution broke out, religious persecution began. Everyone, who remained loyal to the Church and to the Pope, was punished with confiscation of property, exile and even death. On Easter Friday, 1792, the National Convention issued an order to eliminate religious congregations and orders, which provide formation and take care of the sick. The General Superioress of the Daughters of Mercy wrote then to the sisters who served in Angers: “My dear daughters please do not stop to serve the poor sick unless you are forced to do this. Do not lose your courage; strengthen your faith and hope. Stay in prayer. That’s all you can do now”.

The Jacobins tied to force the sisters to take an oath, which was inconsistent with loyalty to the Church and to the Pope. When the sisters strongly refused, on January 19, 1794 they were arrested and imprisoned. On February 1, they were delivered to the square and joined other 200 prisoners. On February 1, 1794 all were shot. On February 19, 1984 both the Daughters of Mercy along with the other 97 martyrs of the French Revolution consecrated blessed by Pope St. John Paul II.
`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },


 // Chân phước Gio-sép-phin Ni-cô-li
  {
    id: 'bl-giuseppina-nicoli',
    date: '02-03',
    title: { 
      vi: 'Chân phước Gio-sép-phin Ni-cô-li',
      en: 'Bl. Giuseppina Nicoli',
     
    },
    subtitle: {
      vi: 'Trinh nữ',
      en: 'Religious',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>
Giuseppina Nicoli was born at Casatisma, Pavia, Italy, on 18 November 1863, the fifth of 10 siblings. At the age of 20 she entered the Daughters of Charity of St Vincent de Paul in Turin, Italy. Two years later, in 1885, she was sent to Sardinia, Italy, where she spent most of her consecrated life. On Christmas Eve 1888 she took simple vows. In 1893, at age 30, she contracted tuberculosis which slowly consumed her holy life dedicated to God and neighbour. Her assignment in Sardinia reaped an abundant harvest. Not only did she care for the poor, orphans and the infirm, she also concerned herself with their evangelization.

At Cagliari she taught catechism to the young students and workers of the Society of the Pious Union of the Sons of Mary, which she had founded and directed and which had St Aloysius Gonzaga as its patron.

In 1899 she was sent to Sassari to run an orphanage, and while there she opened the first Italian section of the "Daughters of Charity" society, dedicated to mending, sewing and distributing clothing to the poor. These women also taught catechism to approximately 800 children every Sunday. For the older students she opened the School of Religion where they were trained to teach the faith to others.

In 1910 she was named provincial bursar of the Turin Province, which gave her the opportunity to return to "the Continent", as the people of Sardinia called it.

In 1912 she was assigned as Directress to the novitiate in Turin. But this duty lasted only nine months due to a deterioration in her lung condition, which spurred her superiors to relocate her to Sardinia, whose warmer climate could benefit her health.

Sr Giuseppina, who had left a warm and hospitable environment in Sassari, found upon her return in 1913 that the atmosphere had completely changed due to anticlericalism and the influence of private interests on behalf of politicians and civil administrators.

Although these same political and civil officials personally admired and esteemed Sr Giuseppina for her abilities and holiness, she suffered the calumny of being said to be incapable of administering the very orphanage she had previously administered successfully. All this led her superiors to transfer her back to Cagliari on 7 August 1914.

The hostilities of World War I did not spare the island of Sardinia and Sr Nicoli and her Sisters set to assisting the wounded. They adapted the kindergarten where they were assigned into a hospital and lovingly nursed the injured.

In Cagliari she was called by the local Bishop to set up the Dorotean Society, whose members were consecrated lay women. With the young women who joined her, Sr Giuseppina founded the "Young Women of Charity" in 1917, and opened with them in the poor, overpopulated suburb of Marina del Poetto a facility for the care of children afflicted with rickets and scrofulosis, a form of tuberculosis.

Other apostolic works that developed with the assistance of Bl. Nicoli were those of the Propagation of the Faith and the Holy Childhood Society. She founded the St Teresa Circle, the first group for young Catholic women in Cagliari and the nucleus of what would later become the Women's Catholic Action. Sr Nicoli also established the Josephite Association (with St Joseph as its patron) for religious instruction, to which the more well-to-do belonged.

This kaleidoscope of apostolic works which brought so much spiritual and material benefit to many is an example of the great things God can do in those who are entirely dedicated to him.

After her death at the age of 61, on 31 December 1924, a handwritten prayer was found tucked in the hollow of the Crucifix she had received at her first vows. In this prayer she had written: "I want to serve you faithfully, practicing poverty, chastity and obedience, and for love of you to serve the poor".
`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

// Chân phước Rô-sa-li Răng-đi
  {
    id: 'bl-rosalie-rendu',
    date: '02-07',
    title: {
      vi: 'Chân phước Rô-sa-li Răng-đi',
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
    // 
    },
    type: 'Lễ nhớ',
     sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>

`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

   // Di chuyển hài cốt Thánh Vinh Sơn Phaolô
  {
    id: 'st-translation-of-relics-paul-apostle',
    date: '04-26',
    title: { 
      vi: 'Di chuyển hài cốt Thánh Vinh Sơn Phaolô',
      en: 'Translation of the Relics of St. Vincent Paul',
     
    },
    subtitle: {
      vi: 'Kỷ niệm việc di chuyển thánh tích của Thánh Vinh Sơn Phaolô',
      en: 'Commemoration of the Translation of the Relics of St. Vincent Paul',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>

`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

// Thánh Gian-na Bơ-rét-ta Mô-la
  {
    id: 'st-gianna-beretta-molla',
    date: '04-28',
    title: { 
      vi: 'Thánh Gian-na Bơ-rét-ta Mô-la',
      en: 'St. Gianna Beretta Molla',
     
    },
    subtitle: {
      vi: 'Giáo dân, Hiền mẫu',
      en: 'Laywoman, Mother',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        Thánh Gian-na Bơ-rét-ta Mô-la sinh ngày 4 tháng 10 năm 1922 tại Magenta (MI); với sự khôn ngoan cảnh giác, cha mẹ cô đã đồng hành cùng thánh nhân trong sự phát triển con người và đức tin Kitô giáo. Cô là một người phụ nữ chân thật và vui vẻ; cô yêu thích câu kinh thánh “những gì là chân thật, cao quý, những gì là chính trực tinh tuyền, những gì là đáng mến và đem lại danh thơm tiếng tốt, những gì là đức hạnh, đáng khen, thì xin anh em hãy để ý” (Pl 4,8). Cô làm việc nhiệt thành trong các hoạt động tông đồ, trong Hội Bác Ái Thánh Vinh Sơn Phao-lô và trong sinh hoạt Công Giáo. Cô theo học đại học Pavia, nơi cô tốt nghiệp ngành Y khoa và Phẫu thuật vào ngày 30 tháng 11 năm 1949. Trong những năm ở Pavia, hàng ngày cô đều đến Nhà thờ Đức Mẹ Núi Cát Minh (Carmel) để cầu nguyện. Cô trở thành bác sĩ ở thị trấn Mesero (MI), nơi cô làm việc cho đến vài ngày trước khi chết. Vào ngày 24 tháng 9 năm 1955, cô kết hôn với ông Pietro Molla. Vào tháng 9 năm 1961, trong lần mang thai khó khăn thứ tư, với sức mạnh của đức tin và lời cầu nguyện, cô đã khẳng định con của của cô sẽ được cứu, thậm chí ngay cả khi cô phải hiến chính mạng sống mình. Cô qua đời một tuần sau khi sinh một bé gái, vào ngày 28 tháng 4 năm 1962, đó là ngày thứ Bảy tuần Bát Nhật Phục Sinh. Cô trỏ nên một chứng nhân đáng ngưỡng mộ về tính thánh thiêng của sự sống.
        `,
       
en: `<strong>Biography</strong>
Gianna Beretta was born in Magenta (Milan) October 4, 1922. Already as a youth she willingly accepted the gift of faith and the clearly Christian education that she received from her excellent parents. As a result, she experienced life as a marvellous gift from God, had a strong faith in Providence and was convinced of the necessity and effectiveness of prayer.

She diligently dedicated herself to studies during the years of her secondary and university education, while, at the same time, applying her faith through generous apostolic service among the youth of Catholic Action and charitable work among the elderly and needy as a member of the St. Vincent de Paul Society. After earning degrees in Medicine and Surgery from the University of Pavia in 1949, she opened a medical clinic in Mesero (near Magenta) in 1950. She specialized in Pediatrics at the University of Milan in 1952 and there after gave special attention to mothers, babies, the elderly and poor.

While working in the field of medicine-which she considered a Â“missionÂ” and practiced as such-she increased her generous service to Catholic Action, especially among the Â“very youngÂ” and, at the same time, expressed her joie de vivre and love of creation through skiing and mountaineering. Through her prayers and those of others, she reflected upon her vocation, which she also considered a gift from God. Having chosen the vocation of marriage, she embraced it with complete enthusiasm and wholly dedicated herself Â“to forming a truly Christian familyÂ”.

She became engaged to Pietro Molla and was radiant with joy and happiness during the time of their engagement, for which she thanked and praised the Lord. They were married on September 24, 1955, in the Basilica of St. Martin in Magenta, and she became a happy wife. In November 1956, to her great joy, she became the mother of Pierluigi, in December 1957 of Mariolina; in July 1959 of Laura. With simplicity and equilibrium she harmonized the demands of mother, wife, doctor and her passion for life.

In September 1961 towards the end of the second month of pregnancy, she was touched by suffering and the mystery of pain; she had developed a fibroma in her uterus. Before the required surgical operation, and conscious of the risk that her continued pregnancy brought, she pleaded with the surgeon to save the life of the child she was carrying, and entrusted herself to prayer and Providence. The life was saved, for which she thanked the Lord. She spent the seven months remaining until the birth of the child in incomparable strength of spirit and unrelenting dedication to her tasks as mother and doctor. She worried that the baby in her womb might be born in pain, and she asked God to prevent that.

A few days before the child was due, although trusting as always in Providence, she was ready to give her life in order to save that of her child: Â“If you must decided between me and the child, do not hesitate: choose the child - I insist on it. Save himÂ”. On the morning of April 21, 1962, Gianna Emanuela was born. Despite all efforts and treatments to save both of them, on the morning of April 28, amid unspeakable pain and after repeated exclamations of Â“Jesus, I love you. Jesus, I love you», the mother died. She was 39 years old. Her funeral was an occasion of profound grief, faith and prayer. The Servant of God lies in the cemetery of Mesero (4 km from Magenta).

Â“Conscious immolation», was the phrase used by Pope Paul VI to define the act of Blessed Gianna, remembering her at the Sunday Angelus of September 23, 1973, as: Â“A young mother from the diocese of Milan, who, to give life to her daughter, sacrificed her own, with conscious immolationÂ”. The Holy Father in these words clearly refers to Christ on Calvary and in the Eucharist.

Gianna was beatified by Pope John Paul II on April 24, 1994, during the international Year of the Family.


`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

  // Chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la
  {
    id: 'bl-ceferino-gimnez-malla', 
    date: '05-05',
    title: { 
      vi: 'Chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la',
      en: 'Bl. Ceferino Gimnez Malla',
     
    },
    subtitle: {
      vi: 'Giáo dân tử đạo',
      en: 'Layman, Martyr',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>
        
        `,
       
en: `<strong>Biography</strong>

`
},
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>


<strong>Lời nguyện nhập lễ</strong>


<strong>Bài đọc (1 Ga 3, 14-18)</strong>

<em>Bài trích thư thứ nhất của thánh Gioan tông đồ.</em>


<strong>Đáp ca (Tv 15)</strong>

<strong>Đ. </strong>

 <strong>Đ.</strong>
 <strong>Đ.</strong>
 <strong>Đ.</strong>

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>

<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>  <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>

<strong>Tin Mừng Đức Giêsu Kitô theo thánh </strong>


<strong>Lời nguyện tiến lễ</strong>


<strong>Ca hiệp lễ (Ga 8,12)</strong>

<strong>Lời nguyện hiệp lễ</strong>

`,       
en: `<strong>MASS</strong>

<strong>Entrance Antiphon (Jer 17:7-8)</strong>


<strong>Collect</strong>


<strong>Reading (1 Jn 3:14-18)</strong>

<em>A reading from the first Letter of Saint .</em>


<strong>Responsorial Psalm (Ps 16)</strong>

<strong>R. You are my inheritance, O Lord!</strong>

 <strong>R.</strong>
 <strong>R.</strong>
 <strong>R.</strong>

<strong>Gospel Acclamation (Jn 15:16)</strong>

<strong>Alleluia, alleluia.</strong>  <strong>Alleluia, alleluia.</strong> 

<strong>Gospel (Jn 15:9-17)</strong>

<strong>A reading from the holy Gospel according to John.</strong>


<strong>Prayer over the Offerings</strong>


<strong>Communion Antiphon (Jn 8:12)</strong>


<strong>Prayer after Communion</strong>

`,    
},
      officeOfReadings: {
        vi: `<strong>KINH SÁCH</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>OFFICE OF READINGS</strong>`
      },
      lauds: {
        vi: `<strong>KINH SÁNG</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MORNING PRAYER</strong>`
      },
      middayPrayer: {
        vi: `<strong>KINH TRƯA</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>MIDDAY PRAYER</strong>`
      },
      vespers: {
        vi: `<strong>KINH CHIỀU</strong>
        <strong>Thánh thi </strong>`,

        en: `<strong>EVENING PRAYER</strong>`
      },
      // compline: placeholder,
    }
  },

  // Thánh Phan-xi-cô Rê-gi-xê Cờ-lê
  {
    id: 'st-francis-regis-clet',
    date: '07-09',
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
      biography: {
        vi: '<strong>Tiểu sử</strong><br>Thánh Phan-xi-cô Rê-gi-xê Cờ-lê sinh ngày 19 tháng 5 năm 1748 tại Grenoble, Pháp. Ngài gia nhập Tu hội Truyền giáo và được thụ phong linh mục vào năm 1771. Năm 1785, ngài được gửi đến Trung Quốc để truyền giáo. Trong thời gian ở đó, ngài đã học tiếng Trung và làm việc chăm chỉ để rao giảng Tin Mừng, bất chấp những khó khăn và nguy hiểm do cuộc bách hại đạo diễn ra dưới triều đại nhà Thanh. Ngài bị bắt giữ nhiều lần và cuối cùng bị kết án tử hình vì đức tin của mình. Thánh Phan-xi-cô Rê-gi-xê Cờ-lê đã chịu tử đạo bằng cách bị chém đầu vào ngày 18 tháng 2 năm 1820 tại Nam Kinh, Trung Quốc. Ngài được Giáo hội công nhận là thánh vào ngày 1 tháng 10 năm 2000 bởi Đức Giáo hoàng Gioan Phaolô II.',
        en: `<strong>Biography</strong><br>St. Francis Regis Clet was born on May 19, 1748, in Grenoble, France. He joined the Congregation of the Mission and was ordained a priest in 1771. In 1785, he was sent to China as a missionary. During his time there, he learned the Chinese language and worked tirelessly to spread the Gospel, despite the challenges and dangers posed by the persecution of Christians under the Qing dynasty. He was arrested multiple times and ultimately sentenced to death for his faith. St. Francis Regis Clet was martyred by beheading on February 18, 1820, in Nanjing, China. He was canonized by Pope John Paul II on October 1, 2000.`
      },
      massReadings: {
        vi: `<strong>THÁNH LỄ</strong>
            <strong>Ca nhập lễ</strong>
              (Lm 3, 22-23)
              Lòng thương xót của Đức Chúa không bao giờ chấm dứt, vì lòng nhân từ của Người không bao giờ cạn. Mỗi sáng sớm, lòng nhân từ của Người lại mới mẻ.
              <strong>Lời nguyện nhập lễ</strong>
              Lạy Chúa, trong ngày kỷ niệm thánh Phan-xi-cô Rê-gi-xê Cờ-lê, xin cho chúng con luôn biết noi gương ngài trong việc rao giảng Tin Mừng với lòng can đảm và kiên trung, để nhờ đó chúng con được tham dự vào vinh quang của Chúa trên trời. Chúng con cầu xin.
              <strong>Bài đọc</strong>
              <em></em>
              <strong>Đáp ca</strong>
              <strong>Tung hô Tin Mừng</strong>
              <strong>Tin Mừng</strong>
              <strong>Lời nguyện tiến lễ</strong>
              Lạy Chúa, xin nhận lấy lễ vật chúng con dâng lên trong ngày kỷ niệm thánh Phan-xi-cô Rê-gi-xê Cờ-lê, để nhờ đó chúng con được củng cố trong đức tin và lòng can đảm rao giảng Tin Mừng. Chúng con cầu xin.
              <strong>Ca hiệp lễ</strong>
              <strong>Lời nguyện hiệp lễ</strong>`,
        en: `<strong>MASS</strong>
                <strong>Entrance Antiphon</strong>
                (Lam 3:22-23)
                The steadfast love of the Lord never ceases, his mercies never come to an end; they are new every morning; great is your faithfulness.
                <strong>Collect</strong>
                O God, who in the memorial of Saint Francis Regis Clet give us a model of courage and perseverance in proclaiming the Gospel, grant us, we pray, to share in the glory of your heavenly kingdom. Through our Lord Jesus Christ, your Son.
                <strong>Reading</strong>
                <em></em>
                <strong>Responsorial Psalm</strong>
                <strong>Gospel Acclamation</strong>
                <strong>Gospel</strong>
                <strong>Prayer over the Offerings</strong>
                O Lord, graciously accept the offerings we bring on the memorial of Saint Francis Regis Clet, that we may be strengthened in faith and courage to proclaim the Gospel. Through Christ our Lord.
                <strong>Communion Antiphon</strong>
                <strong>Prayer after Communion</strong>`,
      },
      officeOfReadings: placeholder,
      lauds: placeholder,
      middayPrayer: placeholder,
      vespers: placeholder,
      compline: placeholder,
    }
},

// Chân phước Pi-e Rơ-nê Rô-gơ
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
  // Chân phước Lin-đa-va Giút-ta Đê Ô-li-bô-ra
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
  // Chân phước Mác-ga-ri-ta Ru-tan
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

// Thánh Lu-y-sa đờ Ma-ri-lắc
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
      // { code: 'es', name: 'Español', enabled: true },
      // { code: 'fr', name: 'Français', enabled: true },
      // { code: 'la', name: 'Latina', enabled: true },
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
        { name: { vi: 'Đại lễ', en: 'Solemnity' } },
        { name: { vi: 'Lễ kính', en: 'Feast' } },
        { name: { vi: 'Lễ nhớ', en: 'Memorial' } },
        { name: { vi: 'Kỷ niệm', en: 'Commemoration' } },
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
           { id: 'thanhgiuse', title: { 
            vi: 'Kinh Thánh Giuse', 
            en: ''
          
          }, 
           content: { 

            vi: 'Lạy Thánh Giuse, xưa nay không ai kêu cầu Cha mà vô hiệu. Cha có thần thế trước mặt Đức Chúa Trời đến nỗi người ta có thể nói rằng: “Trên trời, Thánh Giuse truyền lệnh hơn là van xin. Lạy Cha hiền, xin cầu bầu cùng Chúa cho chúng con. Khi ở thế gian này, Cha đã từng là cha nuôi và là vị bảo hộ trung thành của Chúa Con Chí Thánh. Nay xin Cha bào chữa cho chúng con bên toà Chúa. Chúng con trao phó nơi Cha vụ khó khăn này (…) xin Cha giải gỡ giúp chúng con, để thêm một vinh quang mới vào bao nhiêu vinh quang sẵn có của Cha. Lạy Thánh Giuse nhân từ, chúng con tin tưởng, vâng chúng con tin tưởng Cha có thể chấp nhận lời nguyện của chúng con, và giải thoát chúng con khỏi những khổ cực ưu sầu mà chúng con đang gặp phải. Hơn nữa, chúng con vững lòng trông cậy, Cha không bỏ qua điều gì giúp ích cho những người sầu khổ kêu cầu Cha. Chúng con sấp mình dưới chân Cha, tha thiết nài xin Cha đoái thương đến những than van khóc lóc của chúng con, xin Cha lấy tình thương như áo choàng che phủ chúng con và chúc lành cho chúng con. Amen.', 
            en: ''
          }},
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
