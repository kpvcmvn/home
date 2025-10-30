
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
};
const FEASTS = [

  // 1 Thánh Ê-li-za-bét An-na Xe-tôn
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
        vi: 
    `     
      Elizabeth Ann Baley sinh ở New York ngày 28 tháng 8 năm 1774, khi sắp xảy ra các biến cố đưa Hợp chủng quốc Hoa Kỳ đến nền Độc lập. Mồ côi mẹ lúc ba tuổi, cô bé lớn lên trong một gia đình được đánh dấu bởi sự tục huyền của cha cô và việc gia đình thuộc Giáo Hội Tân giáo.
      Thánh nữ kết hôn với William Seton lúc 20 tuổi, và từ cuộc hôn nhân này, bà có năm người con. Trong một chuyến đi công tác đến Ý, chồng bà qua đời ở Pise ngày 27 tháng 12 năm 1803. Bà được một gia đình thân tình công giáo đón tiếp và an ủi: đó là gia đình Felicchi mà bà phát hiện có lòng bác ái sâu xa.  
      Trở về Hoa Kỳ, Elizabeth, là tín đồ Tân giáo sùng đạo, giờ đây lại cảm thấy bị giáo thuyết Công giáo thu hút mạnh mẽ. Gia đình bà, vì không hiểu sự tìm hiểu nghiên cứu này của bà, nên ruồng bỏ bà. Khi đó, Elizabeth đương đầu với rất nhiều thử thách cá nhân cũng như gia đình. Cuối cùng, đến ngày 14 tháng 3 năm 1805, bà được tiếp nhận vào Giáo Hội Công Giáo.
      Trong khi vẫn có một cuộc sống thiêng liêng mãnh liệt và thường xuyên chăm lo giáo dục con cái, bà vẫn theo đuổi sở thích riêng là được dấn thân trọn vẹn cho các công việc bác ái. Đến năm 1809, bà sáng lập Hội Dòng các Nữ tu Bác ái, ở giáo phận Baltimore, nhận thánh Giuse làm quan thầy, để giáo dục các thiếu nữ. Theo sự hướng dẫn của Đức Cha Cheverus, bà muốn được sát nhập với Tu Hội Nữ Tử Bác Ái thánh Vinh Sơn Phaolô, thế nhưng tình hình chính trị lúc bấy giờ cản trở kế hoạch này. Đến ngày 4 tháng 01 năm 1821, Ê-li-za-bét An-na Xe-tôn qua đời ở Emmitsburg. Bà cũng là người làm phát sinh ra năm nhánh các nữ tu Hoa Kỳ hoạt động bác ái. Nhánh ở Emmitsburg sẽ hợp nhất với Tu Hội Nữ Tử Bác Ái vào ngày 25 tháng 3 năm 1850.                     
      Được Lời Chúa rèn luyện, cùng với một tình yêu cuồng nhiệt đối với Giáo Hội, Ê-li-za-bét An-na Xe-tôn để lại một tư tưởng vững chắc. Ngài được Đức Giáo Hoàng Gioan XXIII tuyên phong chân phước ngày 17 tháng 3 năm 1963, và được Đức Phaolô VI tôn phong hiển thánh ngày 14 tháng 9 năm 1975.
  `,

      
en: 
  `       
      Elizabeth Ann Bayley was born in New York on August 28, 1774, on the eve of the events that would lead the United States of America to its Independence. Orphaned of her mother at the age of three, she grew up in a family marked by her father's remarriage and their membership in the Episcopal Church.
      She married William Seton at the age of 20, and from this marriage, she had five children. During a business trip to Italy, her husband died in Pisa on December 27, 1803. She was welcomed and comforted by a friendly Catholic family: the Felicchi family, in whom she discovered profound charity.
      Upon her return to the United States, Elizabeth, a devout Episcopalian, now felt strongly attracted to Catholic doctrine. Her family, not understanding her quest, abandoned her. Elizabeth then faced many personal and family trials. Finally, on March 14, 1805, she was received into the Catholic Church.
      While maintaining an intense spiritual life and regularly caring for the education of her children, she pursued her own interest in being fully committed to charitable works. In 1809, she founded the Congregation of the Sisters of Charity in the diocese of Baltimore, with St. Joseph as its patron, for the education of young girls. Under the guidance of Bishop Cheverus, she wished to be affiliated with the Company of the Daughters of Charity of St. Vincent de Paul, but the political situation at the time prevented this plan. On January 4, 1821, Elizabeth Ann Seton died in Emmitsburg. She was also the originator of five branches of American Sisters of Charity. The Emmitsburg branch would merge with the Company of the Daughters of Charity on March 25, 1850.
      Formed by the Word of God, with a fervent love for the Church, Elizabeth Ann Seton left a solid legacy of thought. She was beatified by Pope John XXIII on March 17, 1963, and canonized by Pope Paul VI on September 14, 1975.
`,

},
      massReadings: {
        vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc </strong>(Gr 20, 7,8b-9)
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
<i>Đó là lời Chúa.</i> 

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>

Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG </strong>(Ga 15, 9 – 17)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>
      Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin...
`,
       
en: `
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

  // 2 Chân phước Lin-đan-ba Giút-ta Ô-li-bây-ra
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
        vi: `
      Chân phước Lin-đan-va Giút-ta Ô-li-bây-ra sinh ngày 20/10/1953, tại Sitio Maihada de Areira, Acu, ở Brasil. Từ thời thơ ấu, chân phước đã trau dồi một tình yêu mến đặc biệt đối với người nghèo. Khi trở thành Nữ Tử Bác Ái Thánh Vinh Sơn Phaolô, chị phục vụ người nghèo và người già cả tại một viện Dưỡng Lão… Sơ là tấm gương tuyệt vời trong công việc, trong sự dấn thân để tạo tinh thần hiệp thông với mọi người, nhất là với các chị em trong tu hội. Công việc bác ái của chị đã không ngừng phát triển cho tới ngày chị bảo vệ sự trinh khiết của mình cho đến chết. Được ơn tử đạo, chân phước chết tử đạo ngày 09 tháng 4 năm 1993. Chị được phong chân phước ngày 2 tháng 12 năm 1993, tại Salvador-Bahia, ở Brasil.   
        `,
       
en: `
      Blessed Lindalva Justo de Oliveira was born on October 20, 1953, in Sítio Malhada da Areia, a very poor area in Rio Grande do Norte, Brazil. She was the sixth of 13 children. Her family, though not wealthy, was rich in Christian faith.
      After completing her studies and receiving an administrative assistant's diploma in 1979, she held various jobs and sent money home to help her mother. In 1982, after lovingly assisting her father during the final months of his terminal illness, she seriously reflected on her life and decided to dedicate herself to serving the poor.
      She joined the Daughters of Charity of St. Vincent de Paul, entering the postulancy on February 11, 1988. On January 29, 1991, Sr. Lindalva was assigned to a municipal nursing home in Salvador da Bahia to care for 40 elderly male patients. She willingly took on the humblest tasks and sought out those who were suffering the most.
      In January 1993, a 46-year-old man named Augusto da Silva Peixoto was admitted to the facility. He became infatuated with Sr. Lindalva. She prudently kept her distance, but he openly declared his lustful intentions. Although she could have left, Sr. Lindalva declared, "I prefer to shed my blood than to leave this place."
      On April 9, 1993 (Good Friday), Sr. Lindalva attended the Way of the Cross at 4:30 a.m. By 7 a.m., she was back at work preparing and serving breakfast. As she was serving coffee, Augusto approached and stabbed her 44 times. He then calmly sat down, wiped the knife, and told the doctor, "You can call the police, I will not run away; I did what had to be done."
      Sr. Lindalva Justo de Oliveira was beatified as a martyr on December 2, 2007, in Salvador, Bahia, Brazil.`
},
      massReadings: {
        vi: `

<strong>Ca nhập lễ</strong>
Chân phước Lin-đan-va Giút-ta Ô-li-bây-ra quả thực là một vị tử đạo, vì chị đã đổ máu mình ra vì danh Đức Kitô. Chị đã không sợ hãi trước những đe dọa, và chị đã đạt được Nước Trời.  

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, nơi Chân Phước Lin-đan-va, Chúa đã chuẩn nhận việc phục vụ người nghèo bằng phần thưởng tử đạo. Nhờ lời chuyển cầu của người, xin Chúa cho chúng con khi thực hiện công việc vì lòng yêu mến Chúa, biết hy sinh cuộc sống của mình làm của lễ đẹp lòng Chúa. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (1 Ga 5, 1-5)
<strong>Bài trích thư thứ nhất của Thánh Gio-an Tông Đồ</strong>
      Phàm ai tin rằng Đức Giêsu là Đấng Kitô, kẻ ấy đã được Thiên Chúa sinh ra. Và ai yêu mến Đấng sinh thành, thì cũng yêu thương kẻ được Đấng ấy sinh ra. Căn cứ vào điều này, chúng ta biết được mình yêu thương con cái Thiên Chúa và thi hành các điều răn của Người. Quả thật, yêu mến Thiên Chúa là tuân giữ các điều răn của Người. Mà các điều răn của Người có nặng nề gì đâu, vì mọi kẻ đã được Thiên Chúa sinh ra đều thắng được thế gian. Và điều làm cho chúng ta thắng được thế gian, đó là lòng tin của chúng ta. Ai là người thắng được thế gian, nếu không phải là người tin rằng Đức Giêsu là Con Thiên Chúa ?
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 36, 4-5, 5-6, 30-31)
<strong>Đ. LLạy Chúa, hy vọng của con đặt ở nơi Chúa.</strong>
Cứ tin tưởng vào Chúa và làm điều thiện,
thì sẽ được ở trong đất nước và sống yên hàn.
Hãy lấy Chúa làm niềm vui của bạn,
Người sẽ cho được phỉ chí toại lòng.		    <strong>Đ.</strong>

Hãy ký thác đường đời cho Chúa,
tin tưởng vào Người, Người sẽ ra tay.
Chính nghĩa bạn, Chúa sẽ làm rực rỡ tựa bình minh,
công lý bạn, Người sẽ cho huy hoàng như chính ngọ.		    <strong>Đ.</strong>

Miệng người công chính niệm lẽ khôn ngoan
và lưỡi họ nói lên điều chính trực.
Luật Thiên Chúa, họ ghi tạc vào lòng,
bước chân đi không hề lảo đảo. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (1Pr 4,14)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Nếu bị sỉ nhục vì danh Đức Kitô, anh em thật có phúc, bởi lẽ Thần Khí vinh hiển và uy quyền, là Thần Khí của Thiên Chúa, ngự trên anh em. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Lc 9,23-26)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Luca</strong>
      Đức Giêsu nói với mọi người: “Ai muốn theo tôi, phải từ bỏ chính mình, vác thập giá mình hằng ngày mà theo. Quả vậy, ai muốn cứu mạng sống mình, thì sẽ mất; còn ai liều mạng sống mình vì tôi, thì sẽ cứu được mạng sống ấy. Vì người nào được cả thế giới mà phải đánh mất chính mình hay là thiệt thân, thì nào có ích lợi gì? Ai xấu hổ vì tôi và vì những lời của tôi, thì Con Người cũng sẽ xấu hổ vì kẻ ấy, khi Người ngự đến trong vinh quang của mình, của Chúa Cha và các thánh thiên thần.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, chúng con dâng tiến Chúa những lễ vật này trong ngày lễ kính chân phước Lin-đan-va: Xin Chúa vui lòng chấp nhận như Chúa đã vui lòng đón nhận cuộc tử đạo của Người.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu, chúng con tạ ơn Chúa mọi nơi mọi lúc, thật là chính đáng, phải đạo và đem lại ơn cứu độ cho chúng con.
Chúng con nhận biết dấu chỉ sáng ngời của ân sủng Cha
qua việc tử đạo của Chị.
Khi hy sinh mạng sống mình như Đức Kitô,
Chị đã tôn vinh Danh Cha.
Chính sức mạnh của Cha được tỏ rõ qua sự yếu đuối
khi Cha ban cho những thụ tạo mỏng dòn
được làm chứng cho Cha nhờ Đức Kitô, Chúa chúng con.
Vì thế cùng với các Thiên thần trên trời,
chúng con dưới trần gian chúc tụng, tôn thờ 
và tung hô Cha rằng:

<strong>Ca hiệp lễ</strong> <i>(Mt 16, 24)</i>
Chúa Giêsu phán cùng các môn đệ rằng: “Nếu ai muốn theo Thầy, thì hãy từ bỏ mình đi, và vác thập giá mình mà theo Thầy”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, Chúa đã cho chân phước Lin-đan-va được kể vào số các thánh trên trời, với hai danh hiệu: Trinh nữ và Tử đạo; nhờ sức mạnh của việc rước lễ này, xin Chúa cho chúng con được chiến thắng mọi thử thách, để một ngày kia được hưởng vinh quang nước trời.
Chúng con cầu xin...
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
  
 // 3 Thánh Phaolô Tông Đồ
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
        vi: `
      Hôm nay, chúng ta cử hành việc Đức Giêsu Kitô Phục Sinh tỏ mình ra cho Sao-lô, như là Đấng Mêsia vinh hiển nơi Thiên Chúa và đang sống động nơi các môn đệ, và Người còn trở nên một với họ. (Cv 9).
      Chính vào ngày 25 tháng 01 năm 1617, tại Folleville (Somme) “đã diễn ra bài giảng đầu tiên của Tu Hội Truyền Giáo” và Chúa cho Tu Hội “được bắt đầu”, vì thánh Vinh Sơn có nói rõ điều đó (SV XII, 169).
      Thiên Chúa, Đấng kêu gọi Vị Tông đồ dân ngoại, cũng khơi dậy nơi Vinh Sơn Phao-lô việc rao giảng Tin Mừng cho người nghèo khó, “điều mà Chúa cố ý cho xảy ra vào ngày hôm đó” (SV XI, 4).
        
        `,
       
en: `
      Today, we celebrate the manifestation of the Risen Jesus Christ to Saul (Acts 9), revealing Himself as the glorious Messiah who is with God, lives in His disciples, and has become one with them.
      It was on January 25, 1617, in Folleville (Somme), that "the first sermon of the Mission" took place, and the Lord granted the Congregation "its beginning," as Saint Vincent clearly stated (SV XII, 169).
      The same God who called the Apostle to the Gentiles also inspired in Vincent de Paul the preaching of the Gospel to the poor, "which the Lord willed to happen on that day" (SV XI, 4).
`
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ </strong>(2Tm 1, 12; 4, 8)
Tôi biết tôi tin vào ai; và tôi xác tín rằng Chúa là vị Thẩm Phán chí công sẽ trao phần thưởng đó cho tôi trong ngày Người xuất hiện.

<strong>KINH VINH DANH</strong>
<strong>Lời nguyện nhập lễ</strong>
Lạy Thiên Chúa là Cha chúng con, trong ngày chúng con cử hành lễ thánh Phaolô tông đồ trở lại, Chúa đã kêu gọi Thánh Vinh Sơn Phaolô thành lập một gia đình thiêng liêng để rao giảng Tin Mừng cho người nghèo khó và đào tạo hàng giáo sĩ. Xin làm cho chúng con trở nên xứng đáng rao giảng Tin Mừng sự thật và bình an. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (Cv 22, 3-6)
<strong>Bài trích sách Công vụ Tông Đồ</strong>
      Ông Phaolô, bị người Do Thái ở Giêrusalem đe dọa giết, đã nói với họ như thế này: “Tôi là người Do Thái, sinh ở Tác-xô, miền Kilikia, nhưng tôi đã được nuôi dưỡng tại thành này; dưới chân ông Ga-ma-li-ên, tôi đã được giáo dục để giữ Luật cha ông một cách nghiêm ngặt. Tôi cũng đã nhiệt thành phục vụ Thiên Chúa như tất cả các ông hiện nay. Tôi đã bắt bớ Đạo này, không ngần ngại giết kẻ theo Đạo, đã đóng xiềng và tống ngục cả đàn ông lẫn đàn bà, như cả vị thượng tế lẫn toàn thể hội đồng kỳ mục có thể làm chứng cho tôi. Tôi còn được các vị ấy cho thư giới thiệu với anh em ở Đa-mát, và tôi đi để bắt trói những người ở đó, giải về Giêrusalem trừng trị.
      Đang khi tôi đi đường và đến gần Đa-mát, thì vào khoảng trưa, bỗng nhiên có một luồng ánh sáng chói lọi từ trời chiếu xuống bao phủ lấy tôi. Tôi ngã xuống đất và nghe có tiếng nói với tôi: “Sa-un, Sa-un, tại sao ngươi bắt bớ Ta?” Tôi đáp: “Thưa Ngài, Ngài là ai?” Người nói với tôi:
      “Ta là Giêsu Na-da-rét mà ngươi đang bắt bớ”. Những người cùng đi với tôi trông thấy có ánh sáng nhưng không nghe thấy tiếng Đấng đang nói với tôi. Tôi nói: “Lạy Chúa, con phải làm gì ?”. Chúa bảo tôi: “Hãy đứng dậy, đi vào Đa-mát, ở đó người ta sẽ nói cho anh biết tất cả những gì Thiên Chúa đã chỉ định cho anh phải làm”. Vì ánh sáng chói lòa kia làm cho tôi không còn trông thấy nữa, nên tôi đã được các bạn đồng hành cầm tay dắt vào Đa-mát.
      Ở đó, có ông Kha-na-ni-a, một người sùng đạo, sống theo Lề Luật và được mọi người Do Thái ở Đa-mát chứng nhận là tốt. Ông đến, đứng bên tôi và nói: “Anh Sa-un, anh thấy lại đi”. Ngay lúc đó, tôi thấy lại được và nhìn ông. Ông nói: “Thiên Chúa của cha ông chúng ta đã chọn anh để anh được biết ý muốn của Người, được thấy Đấng Công Chính và nghe tiếng từ miệng Đấng ấy phán ra. Quả vậy, anh sẽ làm chứng nhân cho Đấng ấy trước mặt mọi người về các điều anh đã thấy và đã nghe. Vậy bây giờ anh còn chần chừ gì nữa? Anh hãy đứng lên, chịu phép rửa và thanh tẩy mình cho sạch tội lỗi, miệng kêu cầu danh Người”.
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca (Tv 116)</strong>
<strong>Đ. Hãy đi nói cho toàn thế giới biết những kỳ công của Thiên Chúa</strong>
Muôn nước hỡi, nào ca ngợi Chúa,
ngàn dân ơi hãy chúc tụng người!		    <strong>Đ.</strong>

Vì tình Chúa thương ta thật là mãnh liệt,
lòng thành tín của Người bền vững muôn năm.		    <strong>Đ.</strong>

<strong>Tung hô Tin Mừng </strong>(Ga 15,16)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Chúa phán: “Phần Thầy, Thầy đã chọn anh em từ giữa thế gian để anh em ra đi, sinh được hoa trái và hoa trái của anh em tồn tại”. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng</strong> (Mc 16,15-18)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mác-cô</strong>
      Đức Giêsu nói với các Tông đồ: “Anh em hãy đi khắp tứ phương thiên hạ, loan báo Tin Mừng cho mọi loài thọ tạo. Ai tin và chịu phép rửa, sẽ được cứu độ; còn ai không tin, thì sẽ bị kết án. Đây là những dấu lạ sẽ đi theo những ai có lòng tin: nhân danh Thầy, họ sẽ trừ được quỷ, sẽ nói được những tiếng mới lạ. Họ sẽ cầm được rắn, và dù có uống nhằm thuốc độc, thì cũng chẳng sao. Và nếu họ đặt tay trên những người bệnh, thì những người này sẽ được mạnh khỏe”.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, khi chúng con cử hành các mầu nhiệm của Chúa, xin Thánh Thần Chúa chiếu rọi ánh sáng vào đức tin chúng con, như xưa Người đã soi sáng thánh Phaolô tông đồ để làm cho vinh quang Chúa tỏa lan trên toàn thế giới. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong> <i>(Chọn một trong hai mẫu sau đây)</i>
<strong>I</strong> Lạy Chúa là Cha chí thánh,
  là Thiên Chúa toàn năng hằng hữu,
  chúng con tôn vinh Cha, tạ ơn Cha mọi nơi mọi lúc,
  thật là chính đáng, phải đạo
  và đem lại ơn cứu độ cho chúng con.
  Cha là Mục tử hằng hữu,
  Cha không bỏ rơi đoàn chiên Cha,
  nhưng nhờ các thánh Tông đồ,
  Cha luôn che chở giữ gìn.
  Cha còn hướng dẫn
  nhờ chính các vị mục tử
  ngày nay, nhân danh Con Cha coi sóc đoàn chiên.
  Vì thế, cùng với các thiên thần và các thánh,
  chúng con hát mừng vinh quang Cha,
  và không ngừng tung hô rằng:

<strong>II</strong> Lạy Chúa là Cha chí thánh,
  là Thiên Chúa toàn năng hằng hữu,
  chúng con tôn vinh Chúa, tạ ơn Chúa mọi nơi mọi lúc,
  nhờ Đức Kitô Chúa chúng con,
  thật là chính đáng, phải đạo
  và đem lại ơn cứu độ cho chúng con.
  Vì Chúa đã cho Hội Thánh của Con Chúa
  được đứng vững trên nền tảng các Tông Ðồ, 
  để Hội Thánh luôn là dấu chỉ sống động
  sự thánh thiện của Chúa nơi trần gian,
  và trình bày giáo lý bởi trời cho mọi người.
  Vì thế, giờ đây và cho đến muôn đời,
  cùng với các thiên thần,
  chúng con chúc tụng và tung hô Chúa rằng:

<strong>Ca hiệp lễ</strong> <i>(Gl 2, 20)</i>
Tôi sống trong niềm tin vào Con Thiên Chúa, Đấng đã yêu mến tôi và đã hiến mạng vì tôi.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa là Thiên Chúa chúng con, xin cho bí tích chúng con vừa lãnh nhận khơi lên trong tâm hồn chúng con ngọn lửa yêu mến, xưa đã từng nung nấu thánh Phaolô tông đồ, khiến thánh nhân hằng quan tâm lo lắng cho mọi Giáo Đoàn. 
Chúng con cầu xin...
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

 // 4 Chân phước Ma-ri-a An-na Va-i-ô và Ô-đi-la Bôm-gác-tăng
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
        vi: `
      Những năm 1793-1794, ngay giữa thời Cách Mạng, khủng bố hoành hành trên khắp nước Pháp, và đặc biệt ác liệt ở các vùng phía Tây, là nơi nông dân đã cầm vũ khí để bảo vệ đức tin của mình. Hơn 200 linh mục và tu sĩ bị giết hoặc chết trong tù, vì đã từ chối tuyên thệ trung thành với Hiến Chương dân sự của hàng Giáo Sĩ, là văn kiện tách Giáo Hội Pháp ra khỏi Giáo Hội Rôma. Nhiều giáo dân bị kết án tử hình vì muốn trung thành với Chúa Giêsu Kitô trong Giáo Hội. Trong số các vị tử đạo này, có hai Nữ Tử Bác Ái của bệnh viện Thánh Gioan ở Angers: các chị bị xử bắn ngày 1 tháng 2 năm 1794.
      Sơ Ma-ri-a An-na Vai-ô, sinh tại Fontainebleau ngày 13 tháng 5 năm 1734, gia nhập Tu Hội Nữ Tử Bác Ái ngày 25 tháng 9 năm 1761. Sơ giữ chức quản lý ở bệnh viện Angers.
      Sơ Ô-đi-la Bôm-gác-tăng, sinh tại Gondrexange ở Lorraine ngày 15 tháng 11 năm 1750, gia nhập Tu Hội Nữ Tử Bác Ái ngày 4 tháng 8 năm 1775. Sơ phụ trách tủ thuốc ở bệnh viện Angers.
      Vì ảnh hưởng tinh thần và đạo đức của các Chị ở trong Cộng Đoàn, nên người ta chọn hai Sơ làm nạn nhân đầu tiên.
      Sơ Ma-ri-a An-na Vai-ô và Sơ Ô-đi-la Bôm-gác-tăng được Đức Thánh Cha Gioan Phaolô II phong chân phước, cùng với 97 vị tử đạo khác ở Angers, vào ngày 19 tháng 2 năm 1984.
        `,
       
en: `
      In the years 1793-1794, during the height of the [French] Revolution, the Terror reigned throughout France and was particularly fierce in the western regions, where the peasantry had taken up arms to defend their faith.
      More than 200 priests and religious were killed or died in prison for refusing to swear an oath of allegiance to the Civil Constitution of the Clergy, a document that sought to separate the Church in France from the Church of Rome. Many of the faithful were also condemned to death for their desire to remain faithful to Jesus Christ within the Church.
      Among these martyrs were two Daughters of Charity from Saint John's Hospital in Angers: the Sisters were executed by firing squad on February 1, 1794.
      Sister Marie-Anne Vaillot, born in Fontainebleau on May 13, 1734, entered the Company of the Daughters of Charity on September 25, 1761. She served as the administrator of the Angers hospital.
      Sister Odile Baumgarten, born in Gondrexange, Lorraine, on November 15, 1750, entered the Company of the Daughters of Charity on August 4, 1775. She was in charge of the pharmacy at the Angers hospital.
      Because of their spiritual and moral influence within the Community, these two Sisters were chosen as the first victims.
      Sister Marie-Anne Vaillot and Sister Odile Baumgarten were beatified by His Holiness Pope John Paul II, along with 97 other martyrs of Angers, on February 19, 1984.
`
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ</strong> (Kh 12, 11-12)
Chúng ta hãy vui mừng cùng các thánh tử đạo: Họ đã thắng được nhờ máu Con Chiên. Họ coi thường tính mạng, sẵn sàng chịu chết. Vì thế, họ hiển trị cùng Đức Kitô.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã làm sống lại tình yêu của Đức Kitô nơi các chân phước Ma-ri-a An-na Vai-ô và Ô-đi-la Bôm-gác-tăng, đã khiến cho các ngài trở nên quảng đại trong trong việc phục vụ người nghèo, và sẵn sàng hy sinh mạng sống mình vì Chúa. Xin ban cho chúng con sức mạnh để noi gương đức tin vững mạnh và lòng bác ái không mệt mỏi của các ngài, mà luôn sẵn sàng tha thứ, và làm chứng tá rõ ràng như các ngài trước mặt người đời. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (Hr 10, 22-25.32- 36)
<strong>Bài trích thư gửi tín hữu Híp-ri</strong>
      Chúng ta hãy tiến lại gần Thiên Chúa với một lòng chân thành và một đức tin trọn vẹn, vì trong lòng thì đã được tẩy sạch mọi vết nhơ của lương tâm, còn ngoài xác thì đã được tắm rửa bằng nước tinh tuyền. Chúng ta hãy tiếp tục tuyên xưng niềm hy vọng của chúng ta cách vững vàng, vì Đấng đã hứa là Đấng trung tín. Chúng ta hãy để ý đến nhau, làm sao cho người này thúc đẩy người kia sống yêu thương và làm những việc tốt. Chúng ta đừng bỏ các buổi họp như vài người quen làm; trái lại phải khuyến khích nhau, nhất là khi anh em thấy ngày Chúa đến đã gần.
      Xin anh em nhớ lại những ngày đầu: lúc vừa được ơn chiếu sáng, anh em đã phải đối phó với bao nỗi đau khổ dồn dập. Khi thì anh em bị sỉ nhục và hành hạ trước mặt mọi người, khi thì phải liên đới với những người cùng cảnh ngộ. Quả thật anh em đã thông phần đau khổ với những người bị tù tội, và đã vui mừng để cho người ta tước đoạt của cải, bởi biết rằng mình có những của vừa quý giá hơn lại vừa bền vững.
      Vậy anh em đừng đánh mất lòng tin tưởng mạnh dạn của anh em, lòng tin tưởng đó sẽ mang lại một phần thưởng lớn lao. Anh em cần phải kiên nhẫn, để sau khi thi hành ý Thiên Chúa, anh em được hưởng điều Người đã hứa
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 123, 2-5, 7-8)
<strong>Đ. Xin giữ gìn con, lạy Thiên Chúa của con, Ngài là niềm cậy trông duy nhất của con.</strong>
Nếu mà Chúa chẳng đỡ bênh ta,
khi thiên hạ nhằm ta xông tới,
hẳn là họ đã nuốt sống ta rồi,
lúc đùng đùng giận ta như vậy;		    <strong>Đ.</strong>

Hẳn là nước đã cuốn ta đi,
dòng thác lũ dâng lên ngập đầu ngập cổ; 
hẳn là nước cuồn cuộn
đã dâng lên ngập cổ ngập đầu.		    <strong>Đ.</strong>

Hồn ta tựa cánh chim
thoát lưới người đánh bẫy;
lưới giăng đã đứt rồi, 
thế là ta thoát nạn. 		    <strong>Đ.</strong>  

Ta được phù hộ là nhờ Danh Thánh Chúa,
Đấng đã dựng nên cả đất trời 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (Ga 8,12)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> . Chúa nói: “Ta là ánh sáng thế gian. Ai theo Ta, sẽ không phải đi trong bóng tối, nhưng sẽ nhận được ánh sáng đem lại sự sống”. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Ga 12, 24 - 26)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>
      Vài ngày trước lễ Vượt Qua, Đức Giêsu nói với các môn đệ: “Thật, Thầy bảo thật anh em, nếu hạt lúa gieo vào lòng đất mà không chết đi, thì nó vẫn trơ trọi một mình; còn nếu chết đi, nó mới sinh được nhiều hạt khác. Ai yêu quý mạng sống mình, thì sẽ mất; còn ai coi thường mạng sống mình ở đời này, thì sẽ giữ lại được cho sự sống đời đời. Ai phục vụ Thầy, thì hãy theo Thầy; và Thầy ở đâu, kẻ phục vụ Thầy cũng sẽ ở đó. Ai phục vụ Thầy, Cha Thầy sẽ quý trọng người ấy”.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin thương đoái nhìn đến lễ vật chúng con dâng tiến Chúa đây; ước gì lễ vật này được Chúa Thánh Thần thánh hoá, và ban cho chúng con sức mạnh của tình yêu, đã giúp các chân phước Ma-ri-a An-na Vai-ô và Ô-đi-la Bôm-gác-tăng tử đạo, vuợt qua mọi đau khổ của các ngài. Chúng con cầu xin.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Chúng con nhận biết dấu chỉ sáng ngời
của ân sủng Cha qua việc tử đạo
của các chân phước Ma-ri-a An-na Vai-ô và Ô-đi-la Bôm-gác-tăng.
Khi hy sinh mạng sống mình như Đức Kitô,
các ngài đã tôn vinh danh Cha.
Chính sức mạnh của Cha thể hiện trong sự yếu đuối
khi Cha ban cho những tạo vật mỏng dòn
được làm chứng cho Đức Kitô, Chúa chúng con.
Vì thế cùng với các thiên thần trên trời,
chúng con ở dưới trần gian hằng ca ngợi Cha,
thờ lạy Cha và tung hô rằng:    

<strong>Ca hiệp lễ</strong> <i>(2 Tm 2,11-12)</i>
Nếu ta cùng chết với Đức Kitô, ta sẽ cùng sống với Người. Nếu ta kiên tâm chịu đựng, ta sẽ cùng hiển trị với Người.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, Chúa đã làm cho vẻ huy hoàng của mầu nhiệm thập giá tỏa sáng nơi các vị tử đạo của Chúa, là các chân phước Ma-ri-a An-na Vai-ô và Ô-đi-la Bôm-gác-tăng. Giờ đây, xin Cha cho của lễ hy sinh này củng cố chúng con, để chúng con ra sức hoạt động cho phần rỗi của mọi người.
Chúng con cầu xin...
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


 // 5 Chân phước Gio-sép-phin Ni-cô-li
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
        vi: `
      Gio-sép-phin Ni-cô-li sinh tại Ca-sa-tis-ma (giáo phận Tortona), nước I-ta-li-a, ngày 18 tháng 11 năm 1863. Năm 1883, chân phước gia nhập Tu Hội Nữ Tử Bác Ái của thánh Vinh Sơn Phaolô. Hầu như suốt đời, chân phước chuyên lo việc giáo dục các trẻ em ở Sardaigne: trước tiên ở Cagliari, sau đó ở Sassari. Chân phước đã đưa ra nhiều sáng kiến giúp cho giới trẻ được triển nở theo tinh thần kitô giáo, và còn dấn thân vào hoạt động cho người nghèo. Chân phước đã nêu gương về tâm hồn vui vẻ, sự khôn ngoan và công bằng. Trinh nữ đã chọn Đức Giêsu làm Phu Quân. Chân phước qua đời và trở về với Đức Kitô, vị Phu Quân của mình, ngày 31 tháng 12 năm 1924. Ngài  được phong chân phước ngày 3 tháng 2 năm 2008, tại Ca-gli-a-ri.
        
        `,
       
en: `
      Blessed Giuseppina Nicoli (1863-1924) was an Italian Religious Sister with the Daughters of Charity of St. Vincent de Paul. At age 20, she entered the community and was sent to Sardinia in 1885, where she spent most of her life dedicated to serving God and the poor, despite contracting tuberculosis in 1893.
      Her mission focused on caring for orphans, the sick, and the poor, always combining material assistance with evangelization. In Cagliari, she founded the Pious Union of the Sons of Mary to teach catechism. Later, in Sassari, she ran an orphanage and started the "Daughters of Charity" society to provide clothing for the poor and religious instruction for hundreds of children.
      Despite facing anticlerical persecution and false accusations, she remained steadfast. During World War I, she and her Sisters cared for wounded soldiers. She also founded the "Young Women of Charity" (1917) and opened a facility for children suffering from rickets and scrofulosis.
      She died on December 31, 1924. After her death, a prayer was found hidden in her crucifix, resolving to faithfully serve God and the poor through poverty, chastity, and obedience.

`
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ</strong>
Chúng ta hãy vui mừng cử hành lễ chân phước Gio-sép-phin Ni-cô-li; Chúa vũ trụ đã yêu thương người, và đã làm cho người nên một trinh nữ thánh thiện và vinh hiển.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã ban cho chị Gio-sep-phin Ni-cô-li trở nên trinh nữ và chân phước nhiệt thành. Chúa đã đổ tràn trên chị tinh thần Tin Mừng và niềm vui trong tâm hồn để giáo dục các trẻ em. Xin ban cho chúng con biết bắt chước các nhân đức của chị, để chúng con cũng nhận được niềm vui vĩnh cửu.
Chúng con cầu xin...

<strong>Bài đọc</strong> (Pl 4, 4-9)
<strong>Bài trích thư của thánh Phaolô Tông Đồ gửi tín hữu Phi-líp-phê</strong>
      Anh em hãy vui luôn trong niềm vui của Chúa. Tôi nhắc lại: vui lên anh em! Sao cho mọi người thấy anh em sống hiền hòa rộng rãi, Chúa đã gần đến. Anh em đừng lo lắng gì cả. Nhưng trong mọi hoàn cảnh, anh em cứ đem lời cầu khẩn, van xin và tạ ơn, mà giải bày trước mặt Thiên Chúa những điều anh em thỉnh nguyện. Và bình an của Thiên Chúa, bình an vượt trên mọi hiểu biết, sẽ giữ cho lòng trí anh em được kết hợp với Đức Giêsu Kitô. Ngoài ra, thưa anh em, những gì là chân thật, cao quí, những gì là chính trực, tinh tuyền, những gì là đáng mến và đem lại danh thơm tiếng tốt, những gì là đức hạnh, đáng khen, thì xin anh em hãy để ý. Những gì anh em đã học hỏi, đã lãnh nhận, đã nghe, đã thấy ở nơi tôi, thì hãy đem ra thực hành, vì Thiên Chúa là nguồn bình an sẽ ở với anh em.
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca </strong>(Tv 17, 2-3.21-22.32-33)
<strong>Đ. Lạy Chúa, con yêu Chúa, Chúa là sức mạnh của con.</strong>
Con yêu mến Ngài, lạy Chúa là sức mạnh của con;
Lạy Chúa là núi đá, là thành lũy,
là Đấng giải thoát con,
lạy Thiên Chúa con thờ, là núi đá cho con trú ẩn,
là khiên mộc, là Đấng cứu độ quyền năng, 
là thành trì bảo vệ.		    <strong>Đ.</strong>

Chúa xử tốt với tôi, bởi tôi sống ngay lành.
Người ban thưởng cho tôi vì tay tôi trong sạch.
Chính bởi tôi đã theo đường lối Chúa,
không lỗi đạo cùng Thiên Chúa tôi thờ.		    <strong>Đ.</strong>

Ngoài Đức Chúa, hỏi ai là Thiên Chúa?
Ai là núi đá độ trì, ngoài Thiên Chúa của ta?
Chính Thiên Chúa đã làm cho tôi nên hùng dũng,
và cho đường nẻo tôi đi được vẹn toàn. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (Mt 11, 15)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Lạy Cha, Con xin chúc tụng Cha là Chúa tể trời đất, Cha đã mạc khải cho những kẻ bé mọn những mầu nhiệm nước trời <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Mc 10, 13-16)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mác-cô</strong>
      Khi ấy, người ta dẫn trẻ em đến với Đức Giêsu, để Người đặt tay trên chúng. Nhưng các môn đệ xẵng giọng với chúng. Thấy vậy, Người bực mình nói với các ông: “Cứ để trẻ em đến với Thầy, đừng ngăn cấm chúng, vì Nước Thiên Chúa thuộc về những ai giống như chúng. Thầy bảo thật anh em: Ai không đón nhận Nước Thiên Chúa như một trẻ em, thì sẽ chẳng được vào. Rồi Người ôm lấy các trẻ em và đặt tay chúc lành cho chúng.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin cho chúng con được hưởng những hoa trái lễ vật chúng con dâng tiến Chúa đây, để theo gương chân phước Gio-sép-phin, chúng con được giải thoát khỏi những sự trần gian, và sống mạnh mẽ hơn theo Thần Khí Chúa. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh, là Thiên Chúa toàn năng hằng hữu,
Chúng con tôn vinh, cảm tạ Cha mọi nơi mọi lúc,
thật là chính đáng và phải đạo.
Chúng con ca ngợi những ân cần săn sóc của tình thương Cha
đối với bao người nam người nữ đạt tới sự thánh thiện
bằng việc hiến mình cho Đức Kitô vì Nước Trời.
Nhờ mầu nhiệm giao ước này, Cha cho thân phận con người
tìm lại được vẻ huy hoàng ban đầu, và ngay từ đời này,
chúng con được nếm hưởng trước
những thiện hảo mà Cha sẽ ban cho chúng con ở đời sau.
Vì thế cùng với toàn thể các Thiên Thần và các Thánh,
chúng con hát ca tuyên xưng rằng:  

<strong>Ca hiệp lễ</strong> <i>(Mt 18, 3</i>
Đức Giê-su nói với người Do-thái: 
“Thầy bảo thật anh em: nếu anh em không hóa nên như trẻ nhỏ, thì anh em sẽ chẳng được vào Nước Trời”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa là Thiên Chúa chúng con, ước chi việc rước Mình và Máu Thánh Con Chúa giúp chúng con xa lánh mọi sự chóng qua; nhờ thế, theo gương chân phước Gio-sép-phin Ni-cô-li, chúng con có thể tấn tới trong tình yêu chân thành đối với Chúa ngay ở đời này, và nhận được niềm hoan lạc chiêm ngắm Chúa mãi mãi ở trên trời. 
Chúng con cầu xin...
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

// 6 Chân phước Rô-sa-li Răng-đi
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
        vi: `
      Sơ Rô-za-li Răng-đi, Nữ Tử Bác Ái Thánh Vinh Sơn Phaolô, vào đầu thế kỷ XIX, là một nhân vật cao trọng của Paris, chị được mọi người dân nghèo của khu Mouffetard yêu mến và tôn kính.
      Sơ Rô-za-li Răng-đi sinh ngày 9 tháng 9 năm 1786, tại ấp Confort (Ain). Trong các cuộc biến loạn của Cách mạng Pháp, ngôi nhà của gia đình chị đón tiếp và che giấu các linh mục bị truy nã. Chính trong bầu khí tôn giáo khó khăn ấy mà Sơ đã lớn lên.
      Ngày 25 tháng 5 năm 1802, Sơ vào Tập Viện của Tu Hội Nữ Tử Bác Ái ở Paris. Sau đó, chị được sai đến cộng đoàn ở khu phố Mouffetard, một trong các khu nghèo nhất của thủ đô. Được bổ nhiệm làm bề trên cộng đoàn năm 1815, Sơ khuyến khích các chị em trong cộng đoàn: “Người nghèo sẽ chửi rủa các chị. Họ càng thô tục, các chị càng phải có phẩm cách. Các chị hãy nhớ rằng tất cả các quần áo rách rưới ấy che giấu gương mặt Chúa Giêsu Kitô”.
      Để đáp ứng vô số nhu cầu của người nghèo: trẻ em thất học, các bà mẹ quá nhiều việc, người thợ làm việc quá nặng nhọc, người già bị bỏ rơi, Sơ Rô-za-li Răng-đi biết kêu cầu các cộng tác viên có khả năng. Sơ sẽ hướng dẫn bước đầu cho các sinh viên trẻ ở đại học Sorbonne thăm viếng người nghèo và làm cố vấn cho chân phước Frédéric Ozanam khi sáng lập Hiệp Hội Thánh Vinh Sơn Phaolô.
      Trong những ngày nổi dậy tháng 7 năm 1830 và tháng 2 năm 1848, Sơ Rô-za-li Răng-đi không ngần ngại leo lên các rào chiến lũy để cứu giúp các thương binh cho dù họ thuộc phe nào đi nữa. Sơ sẽ đương đầu với ông cảnh sát trưởng tố cáo Sơ đã cứu giúp quân nổi dậy. Sự can đảm và tinh thần tự do của Sơ rất đáng khâm phục. Dân chúng cũng in dấu sâu đậm về sự tận tụy của Sơ và của các chị em trong cộng đoàn khi xảy ra các trận dịch tả năm 1832 và 1849.
      Ngày Sơ qua đời, ngày 7 tháng 2 năm 1856, gây một cảm xúc to lớn trong tất cả các giới xã hội ở Paris. Đám tang của Sơ thật sự là một cuộc khải hoàn đối với người Nữ Tử Bác Ái khiêm tốn ấy. Ngôi mộ của Sơ, tại nghĩa trang Montparnasse, thường xuyên được nở rộ đầy hoa bởi những bàn tay vô danh.
      Sơ Rô-za-li Răng-đi được Đức Thánh Cha Gioan Phaolô II phong chân phước ngày 9 tháng 11 năm 2003.
        
        `,
       
en: `
      Sister Rosalie Rendu, a Daughter of Charity of Saint Vincent de Paul, was a prominent figure in early 19th-century Paris, beloved and revered by all the poor of the Mouffetard district.
      Sister Rosalie Rendu was born on September 9, 1786, in the hamlet of Confort (Ain). During the upheavals of the French Revolution, her family home welcomed and hid persecuted priests. It was in this difficult religious atmosphere that she was raised.
      On May 25, 1802, she entered the Seminary (Novitiate) of the Company of the Daughters of Charity in Paris. She was then sent to the community in the Mouffetard district, one of the poorest areas of the capital. Appointed Superior of the community in 1815, she encouraged her fellow Sisters: "The poor will insult you. The ruder they are, the more dignified you must be. Remember that all those rags hide the face of Jesus Christ."
      To respond to the countless needs of the poor—uneducated children, overworked mothers, overburdened workers, and the abandoned elderly—Sister Rosalie knew how to call upon capable collaborators. She would guide the first steps of the young Sorbonne students in visiting the poor and served as an advisor to Blessed Frédéric Ozanam in the founding of the Society of Saint Vincent de Paul.
      During the uprisings of July 1830 and February 1848, Sister Rosalie did not hesitate to climb the barricades to rescue the wounded, regardless of which side they were on. She would confront the police prefect who accused her of aiding the insurgents. Her courage and spirit of freedom were deeply admired.
      The populace was also profoundly marked by the dedication of her and her Sisters during the cholera epidemics of 1832 and 1849.
      Her death on February 7, 1856, caused a great wave of emotion throughout all levels of Parisian society. Her funeral was a true triumph for this humble Daughter of Charity. Her tomb at the Montparnasse Cemetery is constantly adorned with flowers by anonymous hands.
      Sister Rosalie Rendu was beatified by His Holiness Pope John Paul II on November 9, 2003.
      `
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ</strong> (Mt 25,34.36.40)
Chúa nói với những người đã phục vụ Người trong anh em: “Nào những kẻ Cha Ta chúc phúc, vì xưa Ta đau yếu các ngươi đã viếng thăm… Ta bảo thật các ngươi, mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã ban cho chân phước Rô-za-li tinh thần yêu thương của Chúa khiến chân phước giúp đỡ tất cả những ai lâm cảnh gian truân và bị bỏ rơi. Xin Chúa ban cho chúng con niềm vui, để theo gương chân phước, khám phá ra Đức Kitô nơi người nghèo và phục vụ Người với một tình yêu không mệt mỏi. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (1Cr 12,31-13,1-13)
<strong>Bài trích thư thứ nhất của thánh Phaolô Tông Đồ gởi tín hữu Cô-rin-tô</strong>
      Trong các ân huệ của Thiên Chúa, anh em cứ tha thiết tìm những ơn cao trọng nhất. Nhưng đây tôi xin chỉ cho anh em con đường trổi vượt hơn cả.
      Giả như tôi có nói được các thứ tiếng của loài người và của các thiên thần đi nữa, mà không có đức mến, thì tôi cũng chẳng khác gì thanh la phèng phèng, chũm choẹ xoang xoảng. Giả như tôi được ơn nói tiên tri, và được biết hết mọi điều bí nhiệm, mọi lẽ cao siêu, hay có được tất cả đức tin đến chuyển núi dời non, mà không có đức mến, thì tôi cũng chẳng là gì. Giả như tôi có đem hết gia tài cơ nghiệp mà bố thí, hay nộp cả thân xác tôi để chịu thiêu đốt, mà không có đức mến, thì cũng chẳng ích gì cho tôi. Đức mến thì nhẫn nhục, hiền hậu, không ghen tương, không vênh vang, không tự đắc, không làm điều bất chính, không tìm tư lợi, không nóng giận, không nuôi hận thù, không mừng khi thấy sự gian ác, nhưng vui khi thấy điều chân thật. Đức mến tha thứ tất cả, tin tưởng tất cả, hy vọng tất cả, chịu đựng tất cả. Đức mến không bao giờ mất được. Ơn nói tiên tri ư? cũng chỉ nhất thời. Nói các tiếng lạ chăng? Có ngày sẽ hết. Ơn hiểu biết ư? Rồi cũng chẳng còn. Vì chưng sự hiểu biết thì có ngần, ơn nói tiên tri cũng có hạn. Khi cái hoàn hảo tới, thì cái có ngần có hạn sẽ biến đi. Cũng như khi tôi còn là trẻ con, tôi nói năng như trẻ con, hiểu biết như trẻ con, suy nghĩ như trẻ con; nhưng khi tôi đã thành người lớn, thì tôi bỏ tất cả những gì là trẻ con. Bây giờ chúng ta thấy lờ mờ như trong một tấm gương, mai sau sẽ được mặt giáp mặt. Bây giờ tôi biết chỉ có ngần có hạn, mai sau tôi sẽ được biết hết, như Thiên Chúa biết tôi. Hiện nay đức tin, đức cậy, đức mến, cả ba đều tồn tại. Nhưng cao trọng hơn cả là đức mến.
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 33, 2-7.18-19)
<strong>Đ. Này đây những ngày công lý và hoà bình sẽ tới.</strong>
Tôi sẽ không ngừng chúc tụng Chúa,
câu hát mừng Người chẳng ngớt trên môi.
Linh hồn tôi hãnh diện vì Chúa,
xin các bạn nghèo nghe tôi nói mà vui lên.		    <strong>Đ.</strong>

Hãy cùng tôi ngợi khen Đức Chúa,
ta đồng thanh tán tụng danh Người.
Tôi đã tìm kiếm Chúa và Người đáp lại,
giải thoát cho khỏi mọi nỗi kinh hoàng.		    <strong>Đ.</strong>

Ai nhìn lên Chúa sẽ vui tươi hớn hở,
không bao giờ bẽ mặt hổ ngươi.
Kẻ nghèo này kêu lên và Chúa đã nhận lời,
cứu cho khỏi mọi cơn nguy khốn. 		    <strong>Đ.</strong>

Họ kêu xin, và Chúa đã nhận lời,
giải thoát khỏi mọi cơn nguy khốn.
Chúa gần gũi những tấm lòng tan vỡ,
cứu những tâm thần thất vọng ê chề. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng </strong>(1 Ga 4,21))
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Đây là điều răn mà chúng ta đã nhận được từ Người: ai yêu mến Thiên Chúa, thì cũng yêu thương anh em mình. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Lc 10, 25-37)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Lu-ca</strong>
      Có người thông luật kia đứng lên hỏi Đức Giêsu để thử Người rằng: “Thưa Thầy, tôi phải làm gì để được sự sống đời đời làm gia nghiệp?”. Người đáp: “Trong Luật đã viết gì? Ông đọc thế nào?”. Ông ấy thưa: “Ngươi hãy yêu mến Đức Chúa, Thiên Chúa của ngươi, hết lòng, hết linh hồn, hết sức lực, và hết trí khôn ngươi, và hãy yêu người thân cận như chính mình”. Đức Giêsu bảo ông ta: “Ông trả lời đúng lắm. Cứ làm như vậy là sẽ được sống”.
      Nhưng ông ấy muốn chứng tỏ là mình có lý, nên mới thưa cùng Đức Giêsu rằng: “nhưng ai là người thân cận của tôi?”. Đức Giêsu đáp: Một người kia từ Giê-ru-sa-lem xuống Giê-ri-khô, dọc dường bị rơi vào tay kẻ cướp. Chúng lột sạch người ấy, đánh nhừ tử, rồi bỏ đi, để mặc người ấy nửa sống nửa chết. Tình cờ, có thầy tư tế cũng đi xuống trên con đường ấy. Trông thấy người này, ông tránh qua bên kia mà đi. Rồi cũng thế, một thầy Lê-vi đi tới chỗ ấy, cũng thấy, cũng tránh qua bên kia mà đi. Nhưng một người Sa-ma-ri kia đi đường, tới ngang chỗ người ấy, cũng thấy, và chạnh lòng thương. Ông ta lại gần, lấy dầu lấy rượu đổ lên vết thương cho người ấy và băng bó lại, rồi đặt người ấy trên lưng lừa của mình, đưa về quán trọ mà săn sóc. Hôm sau, ông lấy ra hai quan tiền, trao cho chủ quán và nói: “Nhờ bác săn sóc cho người này, có tốn kém thêm bao nhiêu, thì khi trở về, chính tôi sẽ hoàn lại cho bác”. Vậy theo ông nghĩ, trong ba người đó, ai đã tỏ ra là người thân cận với người đã bị rơi vào tay kẻ cướp?”. Người thông luật trả lời: “Chính là kẻ đã thực thi lòng thương xót đối với người ấy”. Đức Giêsu bảo ông ta: “Ông hãy đi và cũng hãy làm như vậy”.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin nhận những lễ vật của dân Chúa đây, và trong khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương chân phước Rô-za-li, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Chúa là Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Cha luôn khơi động sức mạnh của Hội Thánh Cha,
được chứng tỏ qua niềm tin của các thánh,
và Cha cũng biểu lộ cho chúng con tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
vì gương sáng của các ngài thúc đẩy,
và lời cầu nguyện của các ngài
giúp chúng con hành động để nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần
và các thánh, chúng con ca tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 13,35)</i>
“Cứ dấu này, mọi người sẽ nhận biết anh em là môn đệ của Thầy, là anh em có lòng thương yêu nhau”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, Chúa đã củng cố chúng con qua bí tích vừa lãnh nhận, xin giúp chúng con theo gương tình yêu mà chân phước Rô-za-li đã làm chứng cho Chúa, và đức bác ái mà chân phước đã biểu lộ đối với dân Chúa. 
Chúng con cầu xin...
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

   // 7 Di chuyển hài cốt Thánh Vinh Sơn Phaolô
  {
    id: 'st-translation-of-relics-paul-apostle',
    date: '04-26',
    title: { 
      vi: 'Di chuyển hài cốt Thánh Vinh Sơn Phaolô',
      en: 'The Translation of the Relics of St. Vincent Paul',
     
    },
    subtitle: {
      vi: 'Kỷ niệm việc di chuyển thánh tích của Thánh Vinh Sơn Phaolô',
      en: 'Commemoration of the Translation of the Relics of St. Vincent Paul',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Ngày 28 tháng 9 năm 1660, xác Cha Vinh Sơn qua đời ngày hôm trước được mai táng trong nhà nguyện của nhà Saint Lazare ở Paris, gần nhà thờ Saint Laurent. Khi diễn ra án phong chân phước, người ta tiến hành việc công nhận thánh tích. Sau lễ phong thánh, cử hành tại nhà thờ Saint-Jean-de-Latran ngày 16 tháng 6 năm 1737, thánh tích của thánh Vinh Sơn được đặt trong một hộp thánh tích bằng bạc và để trên lưng bàn thờ cung hiến thánh Lazare. Hộp thánh tích này, mở ra vào nhiều thời kỳ khác nhau, luôn luôn được sùng kính bởi những người con hiếu thảo. Ngày 31 tháng 8 năm 1792, trước ngày các tu sĩ truyền giáo bị đuổi, theo luật, ra khỏi nhà Saint-Lazare, chiếc hộp đựng thánh tích ấy bị người ta sung vào tài sản quốc gia, nhưng xác thánh Vinh Sơn bấy giờ được đem đi giấu tại nhà ông chưởng khế của Tu Hội Truyền Giáo: xác ngài ở đó trong suốt thời kỳ rối loạn của cách mạng, cho tới năm 1806. Hài cốt đáng kính ấy sau đó được giao cho các Nữ Tử Bác Ái, được phục hồi cách hợp pháp từ năm 1800 và cư ngụ tại Paris, ở phố Vieux-Colombier cho tới năm 1815, dời đến phố Bac, là Nhà Mẹ (trụ sở chính) hiện nay của các Chị Nữ Tử Bác Ái.
      Việc chứng thực thánh tích, theo giáo luật, diễn ra tại Tòa Tổng Giám mục Paris (tháng tư năm 1830). Đức Cha De Quelen sau đó đem trưng bày thánh tích tại nhà thờ chính tòa Đức Bà, đựng trong hộp thánh tích bằng bạc, quà tặng của giáo phận. Ngày 25 tháng 4 năm 1830, thánh tích được rước đến Nhà Mẹ Tu Hội Truyền Giáo (95, đường Sèvres, quận 6 Paris). Thánh nữ Catherine Labouré, lúc ấy đang ở Tập viện của Nữ Tử Bác Ai, có tham dự cuộc rước kiệu với cộng đoàn.
      Đến năm 1854 hộp thánh tích được đặt phía trên bàn thờ chính đồ sộ. Năm 1960, để mừng các ngày lễ kỷ niệm ba trăm năm ngày thánh Vinh Sơn qua đời (1581-1660), hộp thánh tích được mang đến nhà thờ chính tòa Paris và nhà thờ Clichy: thánh tích được trưng bày cho các tín hữu tôn kính.
        
        `,
       
en: `
      On September 28, 1660, the body of Father Vincent, who had passed away the preceding day, was interred in the chapel of the Maison Saint Lazare in Paris, near the Church of Saint Laurent.
      During the cause for beatification, the canonical recognition of the relics was carried out. Following the canonization, celebrated at the Basilica of Saint John Lateran on June 16, 1737, the relics of Saint Vincent were placed in a silver shrine and set above the altar consecrated to Saint Lazare. This shrine, opened at various times, has always been venerated by his devoted spiritual children.
      On August 31, 1792, the day before the Priests of the Mission were legally expelled from Saint-Lazare, the shrine was confiscated as national property. However, the holy body of Saint Vincent was taken and hidden in the home of the procurator of the Congregation of the Mission. His body remained there throughout the turmoil of the Revolution until 1806.
      These venerable remains were subsequently entrusted to the Daughters of Charity, who had been legally re-established in 1800. They resided in Paris on the Rue du Vieux-Colombier until 1815, before moving to the Rue du Bac, the present site of the Mother House of the Daughters of Charity.
      The canonical authentication of the relics took place at the Archdiocese of Paris (April 1830). Archbishop De Quelen subsequently exposed the relics for veneration at the Cathedral of Notre Dame, encased in a silver shrine which was a gift from the diocese.
      On April 25, 1830, the relics were translated in procession to the Mother House of the Congregation of the Mission (95, rue de Sèvres, Paris 6e). Saint Catherine Labouré, at that time in the Seminary (Novitiate) of the Daughters of Charity, took part in the procession with her community.
      In 1854, the shrine was placed above the magnificent main altar.
      In 1960, to mark the celebrations of the tercentenary of the death of Saint Vincent (1581-1660), the shrine was brought to the Cathedral of Paris and the Church of Clichy, where the relics were exposed for the veneration of the faithful.

`
},
      massReadings: {
      vi: `

<strong>Ca nhập lễ </strong>(Lc 4,18 (Is 61,1)
“Thần Khí Chúa ngự trên tôi,
vì Chúa đã xức dầu tấn phong tôi.
Người đã sai tôi đi loan báo Tin Mừng cho người nghèo,
cho kẻ bị giam cầm biết họ được tha”

<strong>Lời nguyện nhập lễ</strong>
Lạy Cha chí thánh giàu lòng thương xót, Cha đã lấy lòng bác ái nung đốt thánh Vinh Sơn, để thánh nhân cứu giúp bao nỗi khốn khổ của người thời đại mình; hôm nay, ngày tưởng nhớ việc di chuyển hài cốt của thánh nhân, chúng con nài xin Cha, ban cho chúng con được thấm nhuần Thần Khí của Cha để chúng con cũng biết tôn kính Con yêu dấu của Cha là Đức Giêsu Kitô và phụng sự Ngài nơi bản thân người nghèo. 
Chúng con cầu xin...

<strong>Bài đọc 1</strong> (Is 61,1-3)
<strong>Bài trích sách Ngôn sứ Isaia</strong>
      Thần Khí của Đức Chúa là Chúa Thượng ngự trên tôi, vì Đức Chúa đã xức dầu tấn phong tôi, sai đi báo tin mừng cho kẻ nghèo hèn, băng bó những tấm lòng tan nát, công bố lệnh ân xá cho kẻ bị giam cầm, ngày phóng thích cho những tù nhân, công bố một năm hồng ân của Đức Chúa, một ngày báo phục của Thiên Chúa chúng ta Người sai tôi đi yên ủi mọi kẻ khóc than, tặng cho những kẻ khóc than ở Xi-on tấm khăn đại lễ thay tro bụi, dầu thơm hoan lạc thay tang chế, áo ngày hội thay tâm thần sầu não.
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 95)
<strong>Đ. Toàn cõi đất, hãy hát lên, chúc tụng Thánh Danh Người.</strong>
Hát lên mừng Chúa một bài ca mới,
hát lên mừng Chúa hỡi toàn thể địa cầu
hát lên mừng Chúa, chúc tụng Thánh Danh!		    <strong>Đ.</strong>

Ngày qua ngày, hãy loan báo ơn Người cứu độ,
kể cho muôn dân biết Người vinh hiển,
cho mọi nước nghe việc lạ Người làm.		    <strong>Đ.</strong>

Hãy dâng Chúa, hỡi các dân các nước,
dâng Chúa quyền lực và vinh quang,
hãy dâng Chúa vinh quang xứng danh Người 		    <strong>Đ.</strong>  

<strong>Bài đọc 2</strong> (1Cr 1, 26-31; 2,1-2)
<strong>Bài trích thư thứ nhất của thánh Phaolô Tông Đồ gửi tín hữu Cô-rin-tô</strong>
      Thưa anh em, anh em thử nghĩ lại xem: khi anh em được Chúa kêu gọi, thì trong anh em đâu có mấy kẻ khôn ngoan trước mặt người đời, đâu có mấy người quyền thế, mấy người quý phái. Song những gì thế gian cho là điên dại, thì Thiên Chúa đã chọn để hạ nhục những kẻ khôn ngoan, và những gì thế gian cho là yếu kém thì Thiên Chúa đã chọn để hạ nhục những kẻ hùng mạnh; những gì thế gian cho là hèn mạt không đáng kể, là không có, thì Thiên Chúa đã chọn để hủy diệt những gì hiện có, hầu không một phàm nhân nào dám tự phụ trước mặt Người. Phần anh em, chính nhờ Thiên Chúa mà anh em được hiện hữu trong Đức Kitô Giêsu, Đấng đã trở nên sự khôn ngoan của chúng ta, sự khôn ngoan phát xuất từ Thiên Chúa, Đấng đã làm cho anh em trở nên công chính, đã thánh hoá và cứu chuộc anh em, hợp như lời đã chép rằng: ai tự hào thì hãy tự hào trong Chúa.
      Thưa anh em, khi tôi đến với anh em, tôi đã không dùng lời lẽ hùng hồn hoặc triết lý cao siêu mà loan báo mầu nhiệm cao siêu của Thiên Chúa. Vì hồi còn ở giữa anh em, tôi đã không muốn biết đến chuyện gì khác ngoài Đức Giêsu Kitô, mà là Đức Giêsu Kitô chịu đóng đinh vào thập giá.
      <i>Đó là lời Chúa.</i>

<strong>Tung hô Tin Mừng</strong> (Mt 25,34)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Nào những kẻ Cha Ta chúc phúc, hãy đến thừa hưởng Vương Quốc dọn sẵn cho các ngươi ngay từ thuở tạo thiên lập địa. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Mt 25, 31-46)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Bấy giờ Đức Giêsu nói với các môn đệ về ngày quang lâm của Người: “Khi Con Người đến trong vinh quang của Người, có tất cả các thiên sứ theo hầu, bấy giờ Người sẽ ngự lên ngai vinh hiển của Người. Các dân thiên hạ sẽ được tập hợp trước mặt Người và Người sẽ tách biệt họ với nhau, như mục tử tách biệt chiên với dê. Người sẽ cho chiên đứng bên phải Người, còn dê ở bên trái. Bấy giờ Đức Vua sẽ phán cùng những người ở bên phải rằng: “Nào những kẻ Cha Ta chúc phúc, hãy đến thừa hưởng Vương Quốc dọn sẵn cho các ngươi ngay từ thuở tạo thiên lập địa. Vì xưa Ta đói, các ngươi đã cho ăn; Ta khát, các ngươi đã cho uống; Ta là khách lạ, các ngươi đã tiếp rước; Ta trần truồng, các ngươi đã cho mặc; Ta đau yếu, các ngươi đã thăm viếng; Ta ngồi tù, các ngươi đến hỏi han”. Bấy giờ những người công chính sẽ thưa rằng: “Lạy Chúa, có bao giờ chúng con đã thấy Chúa đói mà cho ăn, khát mà cho uống; có bao giờ đã thấy Chúa là khách lạ mà tiếp rước; hoặc trần truồng mà cho mặc? Có bao giờ chúng con đã thấy Chúa đau yếu hoặc ngồi tù, mà đến hỏi han đâu? Đức Vua sẽ đáp lại rằng: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”. Rồi Đức Vua sẽ phán cùng những người ở bên trái rằng: “Quân bị nguyền rủa kia, đi đi cho khuất mắt Ta mà vào lửa đời đời, nơi dành sẵn cho tên ác quỷ và các sứ thần của nó. Vì xưa Ta đói, các ngươi đã không cho ăn; Ta khát, các ngươi đã không cho uống; Ta là khách lạ, các ngươi đã không tiếp rước; Ta trần truồng, các ngươi đã không cho mặc; Ta đau yếu và ngồi tù, các ngươi đã chẳng thăm viếng”. Bấy giờ những người ấy cũng sẽ thưa rằng: “Lạy Chúa, có bao giờ chúng con đã thấy Chúa đói, khát, hoặc là khách lạ, hoặc trần truồng, đau yếu hay ngồi tù, mà không phục vụ Chúa đâu”. Bấy giờ Người sẽ đáp lại họ rằng: “Ta bảo thật các ngươi: mỗi lần các ngươi không làm như thế cho một trong những người bé nhỏ nhất đây, là các ngươi đã không làm cho chính Ta vậy”. Thế là họ ra đi để chịu cực hình muôn kiếp, còn những người công chính ra đi để hưởng sự sống muôn đời”.
      <i>Đó là lời Chúa.</i>

<strong> KINH TIN KÍNH</strong>
<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin nhận lễ vật của dân Chúa tiến dâng, để việc tưởng nhớ đức bác ái vô biên của Chúa củng cố chúng con, theo gương thánh Vinh Sơn, phục vụ Chúa và tha nhân.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Thiên Chúa toàn năng hằng hữu,
thật là chính đáng và hữu ích cho chúng con,
việc chúng con không ngừng tạ ơn,
chúc tụng và ngợi khen Cha,
trong ngày chúng con tôn kính thánh Vinh Sơn.
Cha đã kêu gọi thánh nhân, bước theo Con Cha,
xả thân loan báo Tin Mừng cho người nghèo,
và lòng nhiệt thành mà Cha ban cho thánh nhân
để làm phát triển Nước Cha,
để lại cho chúng con một qui luật và gương sáng
về lòng nhiệt thành tông đồ.
Được củng cố bởi Thần Khí Cha
và được lôi kéo bởi tình yêu Cha,
chúng con được mời gọi dấn thân
Hãy sinh mạng sống và sức lực của chúng con
lao động cho phần rỗi người nghèo,
nhờ Đức Kitô, Chúa chúng con.
Vì thế, cùng với các thiên thần và các thánh,
Chúng con hát ca tuyên xưng vinh quang Cha rằng:

<strong>Ca hiệp lễ</strong> <i>(Tv 105, 8-9)</i>
Các bạn hãy dâng lời cảm tạ Chúa về tình thương của Ngài,
về những kỳ công Chúa đã thực hiện cho người trần.
Họng khô ráo, Chúa cho uống phỉ tình,
bụng đói lả, Người cho ăn thỏa thích.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, nhờ sức mạnh của bí tích mà chúng con vừa lãnh nhận, xin cho ban chúng con sức mạnh, để luôn tiến bước cách mạnh mẽ trên con đường đức ái mà thánh Vinh Sơn vạch ra cho chúng con, qua lời nói và hành động của ngài.
Chúng con cầu xin...
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

// 8 Thánh Gian-na Bơ-rét-ta Mô-la
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
        vi: `
      Thánh Gian-na Bơ-rét-ta Mô-la sinh ngày 4 tháng 10 năm 1922 tại Magenta (MI); với sự khôn ngoan cảnh giác, cha mẹ cô đã đồng hành cùng thánh nhân trong sự phát triển con người và đức tin Kitô giáo. Cô là một người phụ nữ chân thật và vui vẻ; cô yêu thích câu kinh thánh “những gì là chân thật, cao quý, những gì là chính trực tinh tuyền, những gì là đáng mến và đem lại danh thơm tiếng tốt, những gì là đức hạnh, đáng khen, thì xin anh em hãy để ý” (Pl 4,8). Cô làm việc nhiệt thành trong các hoạt động tông đồ, trong Hội Bác Ái Thánh Vinh Sơn Phao-lô và trong sinh hoạt Công Giáo. Cô theo học đại học Pavia, nơi cô tốt nghiệp ngành Y khoa và Phẫu thuật vào ngày 30 tháng 11 năm 1949. Trong những năm ở Pavia, hàng ngày cô đều đến Nhà thờ Đức Mẹ Núi Cát Minh (Carmel) để cầu nguyện. Cô trở thành bác sĩ ở thị trấn Mesero (MI), nơi cô làm việc cho đến vài ngày trước khi chết. Vào ngày 24 tháng 9 năm 1955, cô kết hôn với ông Pietro Molla. Vào tháng 9 năm 1961, trong lần mang thai khó khăn thứ tư, với sức mạnh của đức tin và lời cầu nguyện, cô đã khẳng định con của của cô sẽ được cứu, thậm chí ngay cả khi cô phải hiến chính mạng sống mình. Cô qua đời một tuần sau khi sinh một bé gái, vào ngày 28 tháng 4 năm 1962, đó là ngày thứ Bảy tuần Bát Nhật Phục Sinh. Cô trỏ nên một chứng nhân đáng ngưỡng mộ về tính thánh thiêng của sự sống.
        `,
       
en: `
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
       vi: `

<strong>Ca nhập lễ</strong> (St 1,27; Tv 138,16)
Thiên Chúa sáng tạo con người theo hình ảnh Ngài,
Thiên Chúa sáng tạo con người theo hình ảnh Thiên Chúa;
Con mới là bào thai, mắt Ngài đã thấy;
mọi ngày đời được dành sẵn cho con
đều thấy ghi trong sổ sách Ngài,
trước khi ngày đầu của đời con khởi sự.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, là Đấng mến yêu sự sống con người, Chúa đã ban ơn cho Thánh Gianna để thánh nhân quảng đại đáp lại ơn gọi Kitô hữu trong vai trò một người vợ và một người mẹ. Nhờ sự chuyển cầu của thánh nhân, xin cũng ban ơn cho chúng con, để chúng con có thể trung thành bước theo kế hoạch của Chúa, nhờ vậy, ân sủng Chúa luôn luôn chiếu sáng trên gia đình của chúng con và thánh hiến tình yêu từ mẫu và sự sống con người.
Chúng con cầu xin...

<strong>Bài đọc</strong> (St 1, 1. 26-31a)
<strong>Bài trích sách Sáng Thế</strong>
      Từ nguyên thuỷ Thiên Chúa đã tạo thành trời đất. Và Thiên Chúa phán: “Chúng ta hãy dựng nên con người theo hình ảnh giống như Ta, để chúng làm chủ cá biển, chim trời, dã thú khắp mặt đất và tất cả loài bò sát di chuyển trên mặt đất”.
      Vậy Thiên Chúa đã tạo thành con người giống hình ảnh Chúa, Chúa tạo thành con người giống hình ảnh Thiên Chúa. Người tạo thành họ có nam có nữ.
      Thiên Chúa chúc phúc cho họ và phán rằng: “Hãy sinh sôi nẩy nở cho nhiều, đầy mặt đất, và thống trị nó; hãy bá chủ cá biển, chim trời và toàn thể sinh vật di chuyển trên mặt đất”. Thiên Chúa phán: “Đây Ta ban cho các ngươi làm thức ăn mọi thứ cây cỏ mang hạt giống trên mặt đất và toàn thể thảo mộc sinh trái có hạt tuỳ theo giống. Ta ban mọi thứ cây cỏ xanh tươi làm thức ăn cho mọi loài dã thú trên mặt đất, chim trời và toàn thể sinh vật di chuyển trên mặt đất”. Và đã xảy ra như vậy. Thiên Chúa thấy mọi sự Người đã làm rất tốt đẹp.
      <i>Đó là lời Chúa.</i>

<strong>Bài đọc</strong> (Rm 8, 28-39)
<strong>Bài trích thư của thánh Phaolô Tông Đồ gửi tín hữu Rôma</strong>
      Anh em thân mến, chúng ta biết rằng: Thiên Chúa làm cho mọi sự đều sinh lợi ích cho những ai yêu mến Người, tức là cho những kẻ được Người kêu gọi theo như ý Người định. Vì những ai Người đã biết từ trước, thì Người đã tiền định cho họ nên đồng hình đồng dạng với Con của Người, để Con của Người làm trưởng tử giữa một đàn em đông đúc. Những ai Thiên Chúa đã tiền định, thì Người cũng kêu gọi; những ai Người đã kêu gọi, thì Người cũng làm cho nên công chính; những ai Người đã làm cho nên công chính, thì Người cũng cho hưởng phúc vinh quang.
      Vậy còn phải nói gì thêm nữa? Có Thiên Chúa bênh đỡ chúng ta, ai còn chống lại được chúng ta? Đến như chính Con Một, Thiên Chúa cũng chẳng tha, nhưng đã trao nộp vì hết thảy chúng ta. Một khi đã ban Người Con đó, lẽ nào Thiên Chúa lại chẳng rộng ban tất cả cho chúng ta? Ai sẽ buộc tội những người Thiên Chúa đã chọn? Chẳng lẽ Thiên Chúa Đấng làm cho nên công chính? Ai sẽ kết án họ? Chẳng lẽ Đức Giêsu Kitô, Đấng đã chết, hơn nữa đã sống lại, và đang ngự bên hữu Thiên Chúa mà chuyển cầu cho chúng ta?
      Ai có thể tách chúng ta ra khỏi tình yêu của Đức Kitô? Phải chăng là gian truân, khốn khổ, đói rách, hiểm nguy, bắt bớ, gươm giáo? Như có lời chép: Chính vì Ngài mà mỗi ngày chúng con bị giết, bị coi như bầy cừu để sát sinh.
      Nhưng trong mọi thử thách ấy, chúng ta toàn thắng nhờ Đấng đã yêu mến chúng ta.
      Đúng thế, tôi tin chắc rằng: cho dầu là sự chết hay sự sống, thiên thần hay ma vương quỷ lực, hiện tại hay tương lai, hoặc bất cứ sức mạnh nào, trời cao hay vực thẳm hay bất cứ một loài thọ tạo nào khác, không có gì tách được chúng ta ra khỏi tình yêu của Thiên Chúa thể hiện nơi Đức Kitô Giêsu, Chúa chúng ta.
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 70,1-3;20-21)
<strong>Đ. Tay Chúa hướng dẫn con. Tay phải Chúa nắm lấy con. Chúa đặt bàn tay Chúa trên con.</strong>
Con ẩn náu bên Ngài, lạy Chúa,
xin đừng để con phải tủi nhục bao giờ.
Vì Ngài công chính, xin cứu vớt và giải thoát con,
ghé tai nghe và thương cứu độ.		    <strong>Đ.</strong>

Xin Ngài nên như núi đá cho con trú ẩn,
như thành trì để cứu độ con,
núi đá và thành trì bảo vệ con, chính là Ngài.		    <strong>Đ.</strong>

Ngài đã bắt con nếm mùi tân khổ,
chính Ngài sẽ cho con được hoàn sinh,
và kéo ra khỏi vực sâu lòng đất. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (Mt 25,40)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Chúa phán: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng </strong>(Mt 25,31-40)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Khi Con Người đến trong vinh quang của Người, có tất cả các thiên sứ theo hầu, bấy giờ Người sẽ ngự lên ngai vinh hiển của Người. Các dân thiên hạ sẽ được tập hợp trước mặt Người, và Người sẽ tách biệt họ với nhau, như mục tử tách biệt chiên với dê. Người sẽ cho chiên đứng bên phải Người, còn dê ở bên trái. Bấy giờ Đức Vua sẽ phán cùng những người ở bên phải rằng: “Nào những kẻ Cha Ta chúc phúc, hãy đến thừa hưởng vương quốc dọn sẵn cho các ngươi ngay từ thuở tạo thiên lập địa. Vì xưa Ta đói, các ngươi đã cho ăn; Ta khát các ngươi đã cho uống; Ta là khách lạ, các ngươi đã tiếp rước; Ta trần truồng các ngươi đã cho mặc; Ta đau yếu, các ngươi đã thăm viếng; Ta ngồi tù các ngươi đến hỏi han”. Bấy giờ những người công chính sẽ thưa rằng: “Lạy Chúa, có bao giờ chúng con đã thấy Chúa đói mà cho ăn, khát mà cho uống; có bao giờ đã thấy Chúa là khách lạ mà tiếp rước; hoặc trần truồng mà cho mặc? Có bao giờ chúng con đã thấy Chúa đau yếu hoặc ngồi tù, mà đến hỏi han đâu?” Đức Vua sẽ đáp lại rằng: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”.
      <i>Đó là lời Chúa.</i>  

<strong>Lời nguyện tiến lễ</strong>
Lạy Thiên Chúa, Đấng đã làm cho Thánh Gianna tràn đầy sức mạnh của Chúa Kitô, để thánh nhân hiến dâng lời chứng cao cả nhất về tình mẫu tử, xin cũng ban ơn cho đoàn dân Chúa đang họp mừng mầu nhiệm tự hiến để cứu độ chúng con. Ước gì chúng con luôn luôn tôn vinh và trân trọng đời sống tôn giáo và sự sống con người, như một dấu chỉ và một món quà của lòng ái tuất vô biên của Chúa.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
nhờ Đức Kitô, Chúa chúng con,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Cha luôn làm sống lại sức mạnh
của Hội Thánh Cha được chứng tỏ
qua niềm tin của các thánh
và cũng biểu lộ cho chúng con tình yêu của Cha.
Ngày hôm nay, chúng con tạ ơn Cha,
vì gương sáng của Thánh Gian-na khích lệ chúng con
và lời cầu nguyện của ngài
giúp chúng con hành động để Nước Cha trị đến.
Vì thế, cùng với các thiên thần và toàn thể các thánh,
chúng con hát ca tuyên xưng vinh quang Cha rằng:

<strong>Ca hiệp lễ</strong> <i>(Mt 25,40)</i>
Ta bảo thật các nguơi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, Chúa đã khiến cho đoàn dân Chúa tham dự vào bàn tiệc bánh hằng sống. Xin làm cho chúng con đạt được tình yêu chân thành và ban ơn cho chúng con, nhờ sự chuyển cầu của Thánh Gian-na, và với ý định vững chắc và hành động cụ thể, để chúng con luôn biết tôn trọng và bảo vệ phẩm giá bất khả xâm phạm của con người mà chính Chúa Kitô đã cứu chuộc và làm cho nên cao trọng nhờ máu của Ngài. 
Chúng con cầu xin...
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

  // 9 Chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la
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
        vi: `
      Chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la, một thành viên của Hiệp hội Bác Ái Thánh Vinh Sơn Phaolô, thường được gọi là “El Pele” (nghĩa là Một Vị Anh Hùng "the Strong One" or "the Brave One"), được sinh ra trong một gia đình thuộc dân du mục Gypsy ở Tây Ban Nha năm 1861. Là người ít học, lại làm công việc mua bán ngựa, nhưng ngài đã trở thành tấm gương về đời sống cầu nguyện và phục vụ tha nhân đến quên mình.
      Đời sống tâm linh, đạo đức của ngài đã được khai phá và thăng hoa nhờ sự hướng dẫn của các tu sĩ dòng Phanxicô. Dân chúng thuộc đủ mọi thành phần đều kính trọng trước lòng đạo đức và bác ái mà ngài dành cho người nghèo. Vào năm 1918, tại Barbastro, khi trông thấy một người ho lao thổ huyết ngã gục trên đường, vị Chân Phước không ngần ngại loại bệnh lây nhiễm, đã tận tình săn sóc người bệnh. Lúc khởi đầu cuộc nội chiến Tây Ban Nha, tháng 7 năm 1936, Xê-phê-ri-nô Ghi-mê-nê Ma-la bị bắt khi bảo vệ một linh mục đang bị kéo lê trên đường phố ở Barbastro, và cũng vì ngài đeo tràng chuỗi Mân Côi. Được hứa trả tự do nếu giao lại chuỗi Mân Côi và ngừng lần hạt, nhưng Xê-phê-ri-nô Ghi-mê-nê Ma-la sẵn sàng chịu cảnh tù đày và tử đạo. Vào tảng sáng ngày 8 tháng 8 năm 1936, Xê-phê-ri-nô Ghi-mê-nê Ma-la bị hành quyết ở nghĩa trang Barbastro. Trước khi chết, ngài cầm chuỗi Mân Côi giơ cao và hô to: “Vạn tuế Vua Kitô!”.
      Xê-phê-ri-nô Ghi-mê-nê Ma-la được Đức Giáo Hoàng Gioan Phaolô II phong Chân Phước ngày 4 tháng 5 năm 1997. Trong buổi lễ tuyên phong chân phước, Đức Giáo Hoàng Gioan Phaolô II nói: “Cuộc đời của ngài cho thấy Đức Kitô luôn hiện diện trong các dân tộc và các dòng giống khác nhau, và mọi người đều được mời gọi tiến tới sự thánh thiện qua việc trung thành tuân giữ các giới răn của Người và luôn ở trong tình yêu của Người”. 

        `,
       
en: `
      Blessed Ceferino Giménez Malla, a member of the Society of Saint Vincent de Paul, commonly known as "El Pelé" (meaning "the Strong One" or "the Brave One"), was born into a Gypsy family in Spain in 1861.
      Though uneducated and working as a horse trader, he became an example of a life of prayer and selfless service to others. His spiritual and virtuous life was discovered and cultivated under the guidance of the Franciscan friars. People from all walks of life respected him for his piety and the charity he showed to the poor. In 1918, in Barbastro, upon seeing a man with consumption collapse on the street coughing up blood, the Blessed, without hesitation or fear of infection, diligently cared for the sick man.
      At the beginning of the Spanish Civil War, in July 1936, Ceferino Giménez Malla was arrested while defending a priest who was being dragged through the streets of Barbastro, and also because he was carrying a Rosary. He was promised freedom if he would surrender his Rosary and stop praying it, but Ceferino Giménez Malla readily chose imprisonment and martyrdom.
      At dawn on August 8, 1936, Ceferino Giménez Malla was executed in the cemetery of Barbastro. Before his death, he held his Rosary aloft and cried out: "Long live Christ the King!"
      Ceferino Giménez Malla was beatified by Pope John Paul II on May 4, 1997. During the beatification ceremony, Pope John Paul II said: "His life shows that Christ is present in all different peoples and races, and that everyone is called to holiness by faithfully observing His commandments and remaining in His love."

`
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ</strong>
Chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la quả thực là một vị tử đạo, vì đã đổ máu mình ra vì danh Đức Kitô. Chân phước không hề sợ hãi những đe dọa, và đã đạt được Nước Trời.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, nơi chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la, Chúa đã chuẩn nhận việc phục vụ người nghèo bằng triều thiên tử đạo. Nhờ lời chuyển cầu của chân phước, xin Chúa cho chúng con biết dâng hiến chính cuộc sống chúng con làm của lễ đẹp lòng Chúa, bằng cách làm mọi việc vì tình yêu Chúa. 
Chúng con cầu xin...

<strong>Bài đọc </strong>(1 Ga 5,1-5)
<strong>Bài trích thư thứ nhất của Thánh Gio-an Tông đồ</strong>
      Phàm ai tin rằng Đức Giêsu là Đấng Kitô, thì đã được Thiên Chúa sinh ra. Và ai yêu mến Đấng sinh thành, thì cũng yêu thương kẻ được Đấng ấy sinh ra. Căn cứ vào điều này, chúng ta biết được mình yêu thương con cái Thiên Chúa và thi hành các điều răn của Người. Quả thật, yêu mến Thiên Chúa là tuân giữ các điều răn của Người. Mà các điều răn của Người có nặng nề gì đâu, vì mọi kẻ đã được Thiên Chúa sinh ra đều thắng được thế gian. Và điều làm cho chúng ta thắng được thế gian, đó là lòng tin của chúng ta.
      Ai là kẻ thắng được thế gian, nếu không phải là người tin rằng Đức Giêsu là Con Thiên Chúa?
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 36, 4-5, 5-6, 30-31)
<strong>Đ. Lạy Chúa, hy vọng của con đặt ở nơi Chúa.</strong>
Cứ tin tưởng vào Chúa và làm điều thiện,
thì sẽ được ở trong đất nước và sống yên hàn.
Hãy lấy Chúa làm niềm vui của bạn,
Người sẽ cho được phỉ chí toại lòng.		    <strong>Đ.</strong>

Hãy ký thác đường đời cho Chúa,
Tin tưởng vào Người, Người sẽ ra tay.
Chính nghĩa bạn, Chúa sẽ làm rực rỡ tựa bình minh,
công lý bạn, Người sẽ cho huy hoàng như chính ngọ.		    <strong>Đ.</strong>

Miệng người công chính niệm lẽ khôn ngoan
và lưỡi họ nói lên điều chính trực.
Luật Thiên Chúa, họ ghi tạc vào lòng,
bước chân đi không hề lảo đảo. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (1Pr 4,14)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Nếu bị sỉ nhục vì danh Đức Kitô, anh em thật có phúc, bởi lẽ Thần Khí vinh hiển và uy quyền, là Thần khí của Thiên Chúa, ngự trên anh em. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> ( Lc 9,23-26)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Lu-ca</strong>
      Rồi Đức Giêsu nói với mọi người: “Ai muốn theo tôi, phải từ bỏ chính mình, vác thập giá mình hằng ngày mà theo. Quả vậy, ai muốn cứu mạng sống mình, thì sẽ mất; còn ai liều mạng sống mình vì tôi, thì sẽ cứu được mạng sống ấy. Vì người nào được cả thế giới mà phải đánh mất chính mình hay là thiệt thân, thì nào có ích lợi gì? Ai xấu hổ vì tôi và vì những lời của tôi, thì Con Người cũng sẽ xấu hổ vì kẻ ấy, khi Người ngự đến trong vinh quang của mình, của Chúa Cha và các thánh thiên thần.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, chúng con dâng tiến Chúa những lễ vật này trong ngày lễ kính Chân Phước Xê-phê-ri-nô Ghi-mê-nê Ma-la. Xin Chúa vui lòng chấp nhận như Chúa đã vui nhận cuộc tử đạo của Chân Phước Xê-phê-ri-nô Ghi-mê-nê Ma-la. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
Chúng con chúc tụng vinh quang Cha, tạ ơn Cha mọi nơi mọi lúc,
Thật là chính đáng, phải đạo.
Chúng con nhận biết dấu chỉ sáng ngời của ân sủng Cha
qua việc tử đạo của chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la.
Khi hy sinh mạng sống mình như Đức Kitô,
là chân phước đã tôn vinh Danh Cha.
Chính sức mạnh của Cha biểu hiện trong sự yếu đuối
khi Cha ban cho những thụ tạo mỏng dòn
được làm chứng cho Đức Kitô, Chúa chúng con.
Vì thế cùng với các thiên thần trên trời,
chúng con ở dưới trần gian hằng thờ lạy Cha,
tung hô ca ngợi Cha rằng:

<strong>Ca hiệp lễ</strong> <i>(Mt 16,24)</i>
Chúa nói: “Ai muốn theo Thầy, phải từ bỏ chính mình, vác thập giá mình mà theo”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, chúng con vừa hân hoan lãnh nhận bánh bởi trời để mừng chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la. Trong tiệc thánh này, chúng con vừa tuyên xưng Ðức Kitô đã chịu chết, xin cho chúng con được cùng với chân phước Xê-phê-ri-nô Ghi-mê-nê Ma-la chia sẻ vinh quang với Ðấng đã phục sinh. 
Chúng con cầu xin...
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

// 10 Chân phước Mi-ri-am Tê-rê-sa Đem-gia-nô-vich
  {
    id: 'sbt-miriam-teresa-demjanovich',
    date: '05-08',
    title: { 
      vi: 'Chân phước Mi-ri-am Tê-rê-sa Đem-gia-nô-vich',
      en: 'Bl. Miriam Teresa Demjanovich',
     
    },
    subtitle: {
      vi: 'Trinh nữ',
      en: 'Virgin',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Chân phước Mi-ri-am Tê-rê-sa Đem-gia-nô-vich sinh ngày 26 tháng 3 năm 1901 tại Bayonne, New Jersey. Tê-rê-sa Đem-gia-nô-vich là con út của ông bà Alexander và Johanna Demjanovich. Thánh nhân lớn lên trong một gia đình cắm rễ sâu trong đức tin Công Giáo và thực hành tôn giáo. Sau cái chết của mẹ cô, gia đình quyết định cho Tê-rê-sa Đem-gia-nô-vich theo học đại học. Tê-rê-sa Đem-gia-nô-vich đã làm những gì gia đình muốn mặc dù ước ao mãnh liệt của cô là trở thành một nữ tu dòng kín Cát Minh giống như các vị thánh bảo trợ của cô là Tê-rê-sa Avila và Tê-rê-sa Hài Đồng Giêsu. Do đó, vào năm 1919, cô đăng ký vào trường cao đẳng thánh Elizabeth ở Convent Station, New Jersey, và nơi đây, cô tốt nghiệp cử nhân văn học. Tất cả những người biết cô đều thấy rõ lòng hiếu thảo của cô. Thông thường, khi thánh lễ và cầu nguyện say đắm trong nhà nguyện, cô trở nên thân mật với Chúa, đặc biệt là cô rất muốn hiểu biết sâu sắc và ý thức về sự ngự trị của Thiên Chúa Ba Ngôi. Trong những năm học đại học, cô nói với bạn cô rằng Đức Trinh Nữ đã xuất hiện bên ngoài cửa sổ ký túc xá của cô. Tin rằng đó là ý muốn của Chúa dành cho cô, vào ngày 11 tháng 2 năm 1925, Tê-rê-sa Đem-gia-nô-vich gia nhập Tu Hội Các Nữ Tu Bác Ái của Thánh Elizabeth Ann Seton. Do sức khỏe của cô giảm sút, nên mặc dù cô là một người mới vào Tu Hội, nhưng cô đã được tuyên khấn tại thời điểm trước lúc chết. Cô qua đời vào ngày 8 tháng 5 năm 1927 và được Đức Giáo Hoàng Phanxicô phong chân phước vào năm 2014.
        
        `,
       
en: `
      Blessed Miriam Teresa Demjanovich was born on March 26, 1901, in Bayonne, New Jersey. Teresa Demjanovich was the youngest child of Alexander and Johanna Demjanovich. She was raised in a family deeply rooted in the Catholic faith and religious practice.
      After her mother's death, the family decided that Teresa should attend college. Teresa did as her family wished, despite her intense desire to become a contemplative Carmelite nun like her patron saints, Teresa of Avila and Thérèse of the Child Jesus. Consequently, in 1919, she enrolled at the College of Saint Elizabeth in Convent Station, New Jersey, where she graduated with a Bachelor of Arts degree.
      Her piety was evident to all who knew her. Often, absorbed in Holy Mass and prayer in the chapel, she grew intimate with the Lord; she especially desired a deep understanding and awareness of the indwelling of the Holy Trinity. During her college years, she told a friend that the Blessed Virgin had appeared outside her dormitory window.
      Believing it was God's will for her, on February 11, 1925, Teresa Demjanovich entered the Congregation of the Sisters of Charity of Saint Elizabeth Ann Seton. Due to her declining health, although she was still a novice, she was permitted to profess her vows at the point of death.
      She died on May 8, 1927, and was beatified by Pope Francis in 2014.

`
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ</strong> (Tv 72,28)
Hạnh phúc của con là ở kề bên Chúa,
chốn ẩn thân đặt ở Chúa Trời.
Mọi việc Ngài làm, con xin kể lại
nơi cửa vào thành thánh Xi-on.

<strong>Lời nguyện nhập lễ</strong>
Lạy Thiên Chúa toàn năng hằng hữu, Ngài đã gọi chân phước Mi-ri-am Tê-rê-sa Đem-gia-nô-vich lên đỉnh cao của đức ái nơi trần thế để chuẩn bị cho cuộc sống vĩnh cửu trên thiên đàng. Nhờ lời chuyển cầu của chân phước Mi-ri-am Tê-rê-sa, xin Chúa làm cho chúng con biết bắt chước sự khiêm nhường của chân phước để đạt đến sự hoàn hảo. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (Rm 8, 28-39)
<strong>Bài trích thư của thánh Phaolô Tông Đồ gửi tín hữu Rôma</strong>
      Anh em thân mến, chúng ta biết rằng: Thiên Chúa làm cho mọi sự đều sinh lợi ích cho những ai yêu mến Người, tức là cho những kẻ được Người kêu gọi theo như ý Người định. Vì những ai Người đã biết từ trước, thì Người đã tiền định cho họ nên đồng hình đồng dạng với Con của Người, để Con của Người làm trưởng tử giữa một đàn em đông đúc. Những ai Thiên Chúa đã tiền định, thì Người cũng kêu gọi; những ai Người đã kêu gọi, thì Người cũng làm cho nên công chính; những ai Người đã làm cho nên công chính, thì Người cũng cho hưởng phúc vinh quang.
      Vậy còn phải nói gì thêm nữa? Có Thiên Chúa bênh đỡ chúng ta, ai còn chống lại được chúng ta? Đến như chính Con Một, Thiên Chúa cũng chẳng tha, nhưng đã trao nộp vì hết thảy chúng ta. Một khi đã ban Người Con đó, lẽ nào Thiên Chúa lại chẳng rộng ban tất cả cho chúng ta? Ai sẽ buộc tội những người Thiên Chúa đã chọn? Chẳng lẽ Thiên Chúa Đấng làm cho nên công chính? Ai sẽ kết án họ? Chẳng lẽ Đức Giêsu Kitô, Đấng đã chết, hơn nữa đã sống lại, và đang ngự bên hữu Thiên Chúa mà chuyển cầu cho chúng ta?
      Ai có thể tách chúng ta ra khỏi tình yêu của Đức Kitô? Phải chăng là gian truân, khốn khổ, đói rách, hiểm nguy, bắt bớ, gươm giáo? Như có lời chép: Chính vì Ngài mà mỗi ngày chúng con bị giết, bị coi như bầy cừu để sát sinh.
      Nhưng trong mọi thử thách ấy, chúng ta toàn thắng nhờ Đấng đã yêu mến chúng ta.
      Đúng thế, tôi tin chắc rằng: cho dầu là sự chết hay sự sống, thiên thần hay ma vương quỷ lực, hiện tại hay tương lai, hoặc bất cứ sức mạnh nào, trời cao hay vực thẳm hay bất cứ một loài thọ tạo nào khác, không có gì tách được chúng ta ra khỏi tình yêu của Thiên Chúa thể hiện nơi Đức Kitô Giêsu, Chúa chúng ta.
      <i>Đó là lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 70,1-3;20-21)
<strong>Đ. Tay Chúa hướng dẫn con
Tay phải Chúa nắm lấy con
Chúa đặt bàn tay Chúa trên con.</strong>
Con ẩn náu bên Ngài, lạy Chúa,
xin đừng để con phải tủi nhục bao giờ.
Vì Ngài công chính, xin cứu vớt và giải thoát con,
ghé tai nghe và thương cứu độ.		    <strong>Đ.</strong>

Xin Ngài nên như núi đá cho con trú ẩn,
như thành trì để cứu độ con,
núi đá và thành trì bảo vệ con, chính là Ngài.		    <strong>Đ.</strong>

Ngài đã bắt con nếm mùi tân khổ,
chính Ngài sẽ cho con được hoàn sinh,
và kéo ra khỏi vực sâu lòng đất.
Phần vinh hoa, Ngài sẽ ban nhiều và trở lại vỗ về an ủi. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Đây là thời thuận tiện, bây giờ là ngày cứu độ. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng</strong> (Mt 25,31-40)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Khi Con Người đến trong vinh quang của Người, có tất cả các thiên sứ theo hầu, bấy giờ Người sẽ ngự lên ngai vinh hiển của Người. Các dân thiên hạ sẽ được tập hợp trước mặt Người, và Người sẽ tách biệt họ với nhau, như mục tử tách biệt chiên với dê. Người sẽ cho chiên đứng bên phải Người, còn dê ở bên trái. Bấy giờ Đức Vua sẽ phán cùng những người ở bên phải rằng: “Nào những kẻ Cha Ta chúc phúc, hãy đến thừa hưởng vương quốc dọn sẵn cho các ngươi ngay từ thuở tạo thiên lập địa. Vì xưa Ta đói, các ngươi đã cho ăn; Ta khát các ngươi đã cho uống; Ta là khách lạ, các ngươi đã tiếp rước; Ta trần truồng các ngươi đã cho mặc; Ta đau yếu, các ngươi đã thăm viếng; Ta ngồi tù các ngươi đến hỏi han”. Bấy giờ những người công chính sẽ thưa rằng: “Lạy Chúa, có bao giờ chúng con đã thấy Chúa đói mà cho ăn, khát mà cho uống; có bao giờ đã thấy Chúa là khách lạ mà tiếp rước; hoặc trần truồng mà cho mặc ? Có bao giờ chúng con đã thấy Chúa đau yếu hoặc ngồi tù, mà đến hỏi han đâu ?” Đức Vua sẽ đáp lại rằng: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, chúng con nhận biết những điều kỳ diệu, mà Chúa đã thực hiện nơi tâm hồn chân phước Mi-ri-am Tê-rê-sa Đem-gia-nô-vich; Chúa đã yêu mến cuộc sống của chân phước, vì đã hoàn toàn thấm nhuần Tin Mừng, chúng con khiêm tốn nài xin Chúa, thương nhận lễ phẩm chúng con dâng tiến. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
nhờ Đức Kitô, Chúa chúng con,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Cha luôn làm sống lại sức mạnh
của Hội Thánh Cha được chứng tỏ
qua niềm tin của các thánh
và cũng biểu lộ cho chúng con tình yêu của Cha.
Ngày hôm nay, chúng con tạ ơn Cha,
vì gương sáng của chân phước Tê-rê-sa Đem-gia-nô-vich khích lệ chúng con
và lời cầu nguyện của ngài
giúp chúng con hành động để Nước Cha trị đến.
Vì thế, cùng với các thiên thần và toàn thể các thánh,
chúng con hát ca tuyên xưng vinh quang Cha rằng:

<strong>Ca hiệp lễ</strong> <i>(Mt 25,40)</i>
Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, được nuôi dưỡng bởi bí tích cứu độ này, chúng con nài xin lòng nhân từ Chúa ban ơn cho chúng con biết thực hành đức bác ái, theo gương chân phước Mi-ri-am Tê-rê-sa Đem-gia-nô-vich, để chúng con được chung phần vinh quang với Ngài. 
Chúng con cầu xin...
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

// 11 Thánh Louise de Marillac
  {
    id: 'st-louise-de-marillac',
    date: '05-09',
    title: {
      vi: 'Thánh Louise de Marillac',
      en: 'St. Louise de Marillac',
    
    },
    subtitle: {
      vi: 'Đồng sáng lập Tu hội Nữ Tử Bác Ái',
      en: 'Co-foundress of the Daughters of Charity',
      
    },
    type: 'Đại lễ',
    sections: {
      biography: {
        vi: `
      Sinh ngày 12 tháng 8 năm 1591, Lu-i-dờ Ma-ri-ắc không bao giờ biết mẹ của mình. Khi còn rất nhỏ, Lu-i-dờ được gởi vào nhà dòng nữ tu Đa Minh tại Poissy. Lu-i-dờ ước muốn trở thành nữ tu dòng Capucinô, nhưng người giám hộ, quan chưởng ấn Michel de Marillac, phản đối, viện cớ rằng Lu-i-dơ thiếu sức khoẻ. Năm 1613, Lu-i-dờ kết hôn với Antoine Le Gras và cậu con trai Michel chào đời là niềm vui của hai vợ chồng. Cơn bệnh kéo dài của chồng sẽ gây cho cô sự bối rối, xao xuyến và đêm tối đức tin. Chúa nhật ngày 4 tháng 6 năm 1623, lễ Hiện Xuống, cũng như Phaolô trên đường đi Đa-mát, ánh sáng Chúa xâm chiếm thánh nữ. Ngài viết sau này: “Trong chốc lát, tâm trí tôi sáng ra”. Bấy giờ ngài hiểu rằng một ngày kia, ngài sẽ tận hiến cho Chúa cùng với nhiều người khác, nhưng không sống trong một đan viện.
      Trở thành quả phụ ngày 21 tháng 12 năm 1625, Lu-i-dờ Ma-ri-ắc, theo lời mời của thánh Vinh Sơn Phaolô, đi thăm người nghèo. Không còn chú trọng đến bản thân mình nữa, để tập trung nghĩ đến những người đang đau khổ, ngài tìm lại được thế quân bình của mình. Thánh Vinh Sơn Phaolô lôi cuốn ngài tham gia vào công việc của các Hội Bác ái và làm cho ngài trở thành cộng tác viên của mình.
      Ngày 29 tháng 11 năm 1633, cùng với thánh Vinh Sơn Phaolô, Lu-i-dờ Ma-ri-ắc sáng lập Tu Hội Nữ Tử Bác Ái. Thánh nữ đảm trách việc đào tạo các chị và tổ chức công việc. Ngày 25 tháng 3 năm 1642, thánh nữ tận hiến cho Thiên Chúa qua những lời khấn khó nghèo, khiết tịnh, vâng phục và phục vụ người nghèo. Cuộc đời thánh nữ Lu-i-dờ Ma-ri-ắc, cũng như cuộc đời thánh Vinh Sơn Phaolô, được định hướng cho tất cả những người đau khổ: các bệnh nhân, người tị nạn, trẻ em bị bỏ rơi, người tù khổ sai, người cao tuổi và người mắc bệnh tâm thần… Mọi hành động của thánh nữ Lu-i-dờ Ma-ri-ắc đều tìm thấy nguồn mạch và tính năng động trong tương quan với Thiên Chúa và tình yêu của ngài đối với Chúa Giêsu đang sống giữa loài người.
      Cậu con trai của ngài, Michel Le Gras, tháng giêng năm 1650, kết hôn với cô Gabrielle Le Clerc. Cô con gái của họ, Louise Renée, sẽ là niềm vui của bà nội.
      Thánh nữ Lu-i-dờ Ma-ri-ắc qua đời ngày 15 tháng 3 năm 1660 tại Paris là nơi mà ngài hằng sinh sống. Di chúc thiêng liêng của ngài nhấn mạnh đến lòng trung thành phục vụ người nghèo và sự đoàn kết trong cộng đoàn. Ngài được Đức giáo hoàng Bênêđictô XV phong chân phước ngày 9 tháng 5 năm 1920 và Đức Piô XI tôn phong hiển thánh ngày 11 tháng 3 năm 1934. Ngày 10 tháng 2 năm 1960, Đức Gioan XXIII tuyên bố ngài là quan thầy của tất cả các Kitô hữu làm việc xã hội.

`,
en: `
      "Above all be very gentle and courteous toward the people you serve; love them tenderly and respect them deeply."
      Wife, mother, foundress, saint – such was the course through life and into eternity of the woman named Louise de Marillac.  She was a woman of courage, interested in the great moral and social problems of her day, and a woman for whose step the poor and hungry of Paris streets listened as she went about serving their needs.
      Nurse, educator, and social worker was St. Louise de Marillac, to whom the world owes the innovation which she and her co-laborer, St. Vincent de Paul, brought into being – a religious community bound by rules and vows, but uncloistered, so that they might be at liberty to serve the poor in their homes, while serving God in a life consecrated to Him.
      Unlike St. Vincent, who was of humble origin, St. Louise de Marillac was born in 1598 and grew up in an illustrious French family.  Like St. Vincent, however, she was to attain to sainthood through trials, difficulties, and suffering.
      At the age of 22, she married Antoine Le Gras, Secretary to the Queen Regent, Marie de Medicis.  Toward the end of the year, a son was born to them and to him she gave all of a mother's love, not foreseeing, at this time, the cause of worry he would be to her in the future.  Although she performed with ease and charm of the duties of her position, she never cared for the life of society.  A few years later, Antoine Le Gras fell ill and died, leaving her a widow at age 34 with a son just 13 years old.
      Whether it was to St. Vincent or to St. Louise that the idea first came of training country girls is of little consequence, but both found in these simple village girls willing hearts and ready hands that worked without fatigue.  St. Louise devoted more and more time to these young girls; she felt that nothing was of greater importance than to educate the minds and hearts of these young women who had heeded a call that could come only from God to serve the poor and the outcast.  She prepared them to teach, to carry out the nursing practices in vogue at the time, and to serve in every field of social work.
      Eventually the young women working with St. Louise joined her in living a community life, under rules and vows like Religious, and dedicated to charitable works.  The Archbishop of Paris gave complete approbation to the Rules, on which St. Vincent and St. Louise were collaborators, but of which she contributed the major part.  Thus, in time, St. Louise fulfilled her mission as Foundress, and the Little Company of Daughters of Charity, Servants of the Sick Poor, was officially established in the Church on November 29, 1633.
      Louise de Marillac was beatified by Pope Benedict XV in 1920 and, in 1934, she was canonized by Pope Pius XI. Her feast day is May 9th. To this day, her remains are enshrined in the chapel of the motherhouse of the Daughters of Charity in Paris. She was declared Patroness of Christian Social Workers by Pope John XXIII in 1960. As a wife, mother, teacher, nurse, social worker and religious foundress, she stands as a model for all women.
`,
     
},
      massReadings: {
       vi: `

<strong>Ca nhập lễ</strong> (2 Cr 5,14-15)
Tình yêu Đức Kitô thôi thúc chúng tôi, vì Đức Kitô đã chết cho mọi người, để những ai đang sống, không còn sống cho chính mình nữa, mà sống cho Đấng đã chết và sống lại vì mình.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã cho thánh nữ Lu-i-dờ Ma-ri-ắc nhận ra và tôn vinh Chúa Kitô nơi người nghèo, xin cho chúng con, theo gương thánh nữ, biết nhìn nhận những ai đang đau khổ và túng thiếu là anh chị em mình; cho chúng con phục vụ họ với lòng kính trọng và yêu thương. 
Chúng con cầu xin...

<strong>BÀI ĐỌC</strong>
<strong>Bài đọc 1</strong> (Is 58,1a.5-11)
<strong>Bài trích sách ngôn sứ Isaia</strong>
      Có lời Chúa rằng: “Cứ lấy hết gân cổ mà kêu lên, đừng kìm hãm, kêu lớn tiếng lên như tù và! Phải chăng đó là cách ăn chay mà Ta ưa chuộng trong ngày con người phải thực hành khổ chế? Cúi rạp đầu như cây sậy cây lau, nằm trên vải thô và tro bụi, phải chăng như thế mà gọi là ăn chay trong ngày các ngươi muốn đẹp lòng Đức Chúa? Cách ăn chay mà Ta ưa thích chẳng phải là thế này sao: mở xiềng xích bạo tàn, tháo gông cùm trói buộc, trả tự do cho người bị áp bức, đập tan mọi gông cùm? Chẳng phải là chia cơm cho người đói, rước vào nhà những người nghèo không nơi trú ngụ; thấy ai mình trần thì cho áo che thân, không ngoảnh mặt làm ngơ trước người anh em cốt nhục? Bấy giờ ánh sáng ngươi sẽ bừng lên như rạng đông, vết thương ngươi sẽ mau lành. Đức công chính ngươi sẽ mở đường phía trước, vinh quang Đức Chúa bao bọc phía sau ngươi. Bấy giờ, ngươi kêu lên, Đức Chúa sẽ nhận lời, ngươi cầu cứu, Người liền đáp lại: “Có Ta đây!” Nếu ngươi loại khỏi nơi ngươi ở gông cùm, cử chỉ đe dọa và lời nói hại người, nếu ngươi nhường miếng ăn cho kẻ đói, làm thoả lòng người bị hạ nhục, thì ánh sáng ngươi sẽ chiếu toả trong bóng tối và tối tăm của ngươi chẳng khác nào chính ngọ. Đức Chúa sẽ không ngừng dẫn dắt ngươi, giữa đồng khô cỏ cháy.
      Người sẽ làm cho ngươi được no lòng; xương cốt ngươi, Người sẽ làm cho cứng cáp. Ngươi sẽ như thửa vườn được tưới đẫm, như mạch suối không cạn nước bao giờ.
      <i>Đó là Lời Chúa.</i>     

<strong>Đáp ca</strong> (Tv 67,4-7,10-11)
<strong>Đ. Chúa đỡ nâng kẻ nghèo hèn, xin chúc tụng Chúa.</strong>
Những người công chính
múa nhảy mừng vui trước mặt Chúa Trời,
niềm hoan lạc trào dâng.
Hãy hát mừng Thiên Chúa, đàn ca kính danh Người,
Danh người là Đức Chúa;
Trước Thánh Nhan, hãy vui mừng hớn hở.		    <strong>Đ.</strong>

Cha nuôi dưỡng cô nhi, Đấng đỡ bênh quả phụ,
chính là Thiên Chúa ngự trong thánh điện Người.
Kẻ cô thân, Thiên Chúa cho nhà cửa,
hạng tù đày, Người trả lại tự do hạnh phúc.	    <strong>Đ.</strong>

Lạy Thiên Chúa, Ngài đổ mưa ân hậu,
gia nghiệp Ngài tiêu hao mòn mỏi, Ngài đã bổ sức cho.
Lạy Thiên Chúa, đàn chiên của Ngài đến ở nơi đâu,
Ngài cũng luôn nâng đỡ,
bởi vì Ngài nhân hậu đối với kẻ khó nghèo. 		    <strong>Đ.</strong>  

<strong>Bài đọc 2</strong> (Gc 2,14-19;26)
<strong>Bài trích thư của thánh Giacôbê Tông đồ</strong>
      Thưa anh em, ai bảo rằng mình có đức tin mà không hành động theo đức tin, thì nào có ích lợi gì? Đức tin có thể cứu người ấy được chăng? Giả như có người anh em hay chị em không có áo che thân và không đủ của ăn hằng ngày, mà có ai trong anh em lại nói với họ: “Hãy đi bình an, mặc cho ấm và ăn cho no”, nhưng lại không cho họ những thứ thân xác họ đang cần, thì nào có ích lợi gì?
      Cũng vậy đức tin không có hành động thì quả là đức tin chết. Đàng khác, có người sẽ bảo: “Bạn, bạn có đức tin; còn tôi, tôi có hành động. Bạn thử cho tôi thấy thế nào là tin mà không hành động, còn tôi, tôi sẽ hành động để cho bạn thấy thế nào là tin. Bạn tin rằng chỉ có một Thiên Chúa duy nhất. Bạn làm phải. Cả ma quỷ cũng tin như thế, và chúng run sợ. Thật thế, một thân xác không có hơi thở là một xác chết, cũng vậy, đức tin không có hành động là đức tin chết”.
      <i>Đó là Lời Chúa.</i>     

<strong>Tung hô Tin Mừng</strong> (Ga 13,34)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy ban cho anh em một điều răn mới là anh em hãy thương yêu nhau như Thầy đã yêu thương anh em. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Ga 13, 1-15)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>
      Trước lễ Vượt Qua, Đức Giêsu biết giờ của Người đã đến, giờ phải bỏ thế gian mà về với Chúa Cha. Người vẫn yêu thương những kẻ thuộc về mình còn ở thế gian, và Người vẫn yêu thương họ đến cùng.
      Ma quỷ đã gieo vào lòng Giu-đa, con ông Si-môn Ít-ca-ri-ốt, ý định nộp Đức Giêsu. Đức Giêsu biết rằng; Chúa Cha đã giao phó mọi sự trong tay Người, Người bởi Thiên Chúa mà đến, và sắp trở về cùng Thiên Chúa, nên trong một bữa ăn, Người đứng dậy, rời bàn ăn, cởi áo ngoài ra, và lấy khăn mà thắt lưng. Rồi Đức Giêsu đổ nước vào chậu, bắt đầu rửa chân cho các môn đệ và lấy khăn thắt lưng mà lau.
      Vậy, Người đến chỗ ông Si-mon Phê-rô, ông liền thưa với Người: “Thưa Thầy! Thầy mà lại rửa chân cho con sao?” Đức Giêsu trả lời: “Việc Thầy làm, bây giờ anh chưa hiểu, nhưng sau này anh sẽ hiểu.” Ông Phêrô lại thưa: “Thầy mà rửa chân cho con, không đời nào con chịu đâu!” Đức Giêsu đáp: “Nếu Thầy không rửa cho anh, anh sẽ chẳng được chung phần với Thầy.” Ông Si-môn Phê-rô liền thưa: “Vậy, thưa Thầy, xin cứ rửa, không những chân, mà cả tay và đầu con nữa”. Đức Giêsu bảo ông: “Ai đã tắm rồi, thì không cần phải rửa nữa; toàn thân người ấy đã sạch. Về phần anh em, anh em đã sạch, nhưng không phải tất cả đâu!”. Thật vậy, Người biết ai sẽ nộp Người, nên mới nói: “Không phải tất cả anh em đều sạch.”
      Khi rửa chân cho các môn đệ xong, Đức Giêsu mặc áo vào, về chỗ và nói: “Anh em có hiểu việc Thầy mới làm cho anh em không? Anh em gọi Thầy là “Thầy” là “Chúa”, điều đó phải lắm, vì quả thật, Thầy là Thầy, là Chúa. Vậy, nếu Thầy là Chúa, là Thầy, mà còn rửa chân cho anh em, thì anh em cũng phải rửa chân cho nhau. Thầy đã nêu gương cho anh em, để anh em cũng làm như Thầy đã làm cho anh em.
      <i>Đó là lời Chúa.</i>

<strong>KINH TIN KÍNH</strong>
<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin thương nhận lễ vật của dân Chúa đây. Và trong khi chúng con nhớ lại tình thương yêu vô biên của Con Chúa, xin làm cho chúng con biết, theo gương thánh nữ Lu-i-dờ Ma-ri-ắc, yêu mến Chúa và yêu thương tha nhân với con tim quảng đại hơn. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Chúa là Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
nhờ Đức Kitô, Chúa chúng con,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Hôm nay, khi mừng lễ thánh nữ Lu-i-dờ Ma-ri-ắc,
Cha cho chúng con chiêm ngắm đức ái của Cha.
Cha đã dạy thánh nữ trao ban những gì cần thiết cho người nghèo
và làm chứng nhân tình yêu của Cha trong thế giới này.
Cha mời gọi gia đình của thánh nữ sống bác ái
và làm cho triều đại công lý
và triều đại lòng xót thương của Cha ngự trị khắp nơi.
Vì thế, cùng với các thiên thần và các thánh
chúng con hát ca tuyên xưng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Mt 25,40)</i>
Ta bảo thật các ngươi: Tất cả những gì các ngươi đã làm cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa là Thiên Chúa chúng con, được mạnh sức bởi việc hiệp lễ này, chúng con nài xin Chúa cho chúng con, theo gương thánh nữ Lu-i-dờ Ma-ri-ắc, chỉ luôn tìm kiếm một mình Chúa và làm nhân chứng cho mọi người về tình yêu của Chúa.
Chúng con cầu xin...

<strong>PHÉP LÀNH TRỌNG THỂ</strong>
      Nơi thánh nữ Lu-i-dờ Ma-ri-ắc, Chúa đã nêu một mẫu gương sáng chói về tình yêu thương đối với người nghèo. Xin Chúa cũng đổ tràn đức ái nồng nhiệt ấy vào tâm hồn anh chị em. Amen.
      Trong ngày lễ thánh nữ Lu-i-dờ Ma-ri-ắc, xin Chúa ban cho anh chị em, qua lời chuyển cầu của thánh nữ, luôn có sự quan tâm huynh đệ đối với người nghèo. Amen.
      Trong ngày lễ thánh nữ Lu-i-dờ Ma-ri-ắc, xin cho anh chị em được hưởng từ bây giờ, lòng thương xót của Chúa, và đón nhận vương quốc mà Người hứa cho những ai có lòng thương xót. Amen.
      Và xin phúc lành của Thiên Chúa toàn năng là Cha và Con và Thánh Thần xuống trên anh chị em và ở lại với anh chị em luôn mãi. Amen.

`,
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

  // 12 Thánh Jeanne antide thouret
  {
    id: 'st-Jeanne-antide-thouret',
    date: '05-23',
    title: { 
      vi: 'Thánh Gio-an-na An-ti-đa Tu-rê',
      en: 'St. Jeanne Antide Thouret',
     
    },
    subtitle: {
      vi: 'Trinh nữ',
      en: 'Virgin',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Gio-an-na An-ti-đa Tu-rê sinh tại Sancey-le-Long thuộc giáo phận Besançon, ngày 27 tháng 11 năm 1765. Năm 1787, Gio-an-na gia nhập Tu Hội Nữ Tử Bác Ái. Năm 1793, do cách mạng Pháp loại bỏ các Tu Hội, nên các Sơ buộc phải giải tán. Gio-an-na trở về gia đình. Tại đây, Sơ tiếp tục phục vụ người nghèo và bệnh nhân. Thay thế cha xứ bị đuổi, Sơ duy trì đức tin sống động trong giáo xứ.
      Năm 1799, vì không thể liên kết với Tu Hội Nữ Tử Bác Ái lúc ấy không còn nữa, Sơ sáng lập Tu Hội các Nữ Tu Bác Ái, tại Besançon, dưới sự bảo trợ của thánh Vinh Sơn Phaolô. Tu Hội phát triển nhanh chóng và năm 1810, lan rộng khắp nước Ý.
      Việc Đức Thánh Cha Piô VII phê chuẩn Luật dòng, năm 1819, là sự khởi đầu của một thời kỳ thử thách và tranh chấp lâu dài, gây chia rẽ trong Hội Dòng. Sơ Gio-an-na An-ti-đa Tu-rê bị đa số các Sơ trong Tu Hội loại ra. Bị buộc phải rời Besançon, Sơ vẫn tiếp tục khuyên nhủ cộng đoàn của Sơ duy trì công việc phục vụ người nghèo và sự hiệp thông huynh đệ. Sơ giữ một sự thanh thản thiêng liêng lớn lao và một lòng trung thành kiên vững đối với Đức Giáo Hoàng.
      Sơ qua đời tại Naples ngày 24 tháng 8 năm 1826. Đức Thánh Cha Piô XI phong chân phước cho Sơ ngày 23 tháng 5 năm 1926 và phong thánh cho Sơ ngày 14 tháng giêng năm 1934.
        `,
       
en: `
      Joan Antida Thouret was born at Sancey-le-Long in the diocese of Besançon, on November 27, 1765.
      In 1787, Joan entered the Company of the Daughters of Charity. In 1793, due to the suppression of Religious Congregations by the French Revolution, the Sisters were forced to disperse. Joan returned to her family. There, she continued to serve the poor and the sick. Taking the place of the expelled parish priest, she kept the faith alive in the parish.
      In 1799, unable to reconnect with the Daughters of Charity which no longer existed at that time, she founded the Congregation of the Sisters of Charity in Besançon, under the patronage of Saint Vincent de Paul. The Congregation grew rapidly and, in 1810, spread throughout Italy.
      The approval of the Rule by Pope Pius VII in 1819 marked the beginning of a period of trial and prolonged conflict, which caused division within the Congregation. Sister Joan Antida Thouret was rejected by the majority of the Sisters in the Congregation.
      Forced to leave Besançon, she continued to exhort her community to maintain their service to the poor and their fraternal communion. She maintained a great spiritual serenity and an unwavering fidelity to the Pope.
      She died in Naples on August 24, 1826. Pope Pius XI beatified her on May 23, 1926, and canonized her on January 14, 1934.
`
},
      massReadings: {
       vi: `

<strong>Ca nhập l</strong>ễ (Tv 72,28)
Hạnh phúc của con là ở kề bên Chúa,
chốn ẩn thân đặt ở Chúa Trời.
Mọi việc Ngài làm, con xin kể lại
nơi cửa vào thành thánh Xi-on.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, xin tuôn đổ trên chúng con ngọn lửa bác ái, mà Chúa đã thắp sáng trong tâm hồn thánh nữ Gio-an-na An-ti-đa Tu-rê, để việc phục vụ khiêm tốn của chúng con góp phần làm cháy sáng ngọn lửa, mà Con Chúa đã mang đến thế gian.
Chúng con cầu xin...

<strong>Bài đọc</strong> (Rm 8, 28-39)
<strong>Bài trích thư của thánh Phaolô Tông Đồ gửi tín hữu Rôma</strong>
      Anh em thân mến, chúng ta biết rằng: Thiên Chúa làm cho mọi sự đều sinh lợi ích cho những ai yêu mến Người, tức là cho những kẻ được Người kêu gọi theo như ý Người định. Vì những ai Người đã biết từ trước, thì Người đã tiền định cho họ nên đồng hình đồng dạng với Con của Người, để Con của Người làm trưởng tử giữa một đàn em đông đúc. Những ai Thiên Chúa đã tiền định, thì Người cũng kêu gọi; những ai Người đã kêu gọi, thì Người cũng làm cho nên công chính; những ai Người đã làm cho nên công chính, thì Người cũng cho hưởng phúc vinh quang.
      Vậy còn phải nói gì thêm nữa? Có Thiên Chúa bênh đỡ chúng ta, ai còn chống lại được chúng ta? Đến như chính Con Một, Thiên Chúa cũng chẳng tha, nhưng đã trao nộp vì hết thảy chúng ta. Một khi đã ban Người Con đó, lẽ nào Thiên Chúa lại chẳng rộng ban tất cả cho chúng ta? Ai sẽ buộc tội những người Thiên Chúa đã chọn? Chẳng lẽ Thiên Chúa Đấng làm cho nên công chính? Ai sẽ kết án họ? Chẳng lẽ Đức Giêsu Kitô, Đấng đã chết, hơn nữa đã sống lại, và đang ngự bên hữu Thiên Chúa mà chuyển cầu cho chúng ta?
      Ai có thể tách chúng ta ra khỏi tình yêu của Đức Kitô? Phải chăng là gian truân, khốn khổ, đói rách, hiểm nguy, bắt bớ, gươm giáo? Như có lời chép: Chính vì Ngài mà mỗi ngày chúng con bị giết, bị coi như bầy cừu để sát sinh.
      Nhưng trong mọi thử thách ấy, chúng ta toàn thắng nhờ Đấng đã yêu mến chúng ta.
      Đúng thế, tôi tin chắc rằng: cho dầu là sự chết hay sự sống, thiên thần hay ma vương quỷ lực, hiện tại hay tương lai, hoặc bất cứ sức mạnh nào, trời cao hay vực thẳm hay bất cứ một loài thọ tạo nào khác, không có gì tách được chúng ta ra khỏi tình yêu của Thiên Chúa thể hiện nơi Đức Kitô Giêsu, Chúa chúng ta.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 70,1-3;20-21)
<strong>Đ. Tay Chúa hướng dẫn con
Tay phải Chúa nắm lấy con
Chúa đặt bàn tay Chúa trên con.</strong>
Con ẩn náu bên Ngài, lạy Chúa,
xin đừng để con phải tủi nhục bao giờ.
Vì Ngài công chính, xin cứu vớt và giải thoát con,
ghé tai nghe và thương cứu độ.		    <strong>Đ.</strong>

Xin Ngài nên như núi đá cho con trú ẩn,
như thành trì để cứu độ con,
núi đá và thành trì bảo vệ con, chính là Ngài.		    <strong>Đ.</strong>

Ngài đã bắt con nếm mùi tân khổ,
chính Ngài sẽ cho con được hoàn sinh,
và kéo ra khỏi vực sâu lòng đất.
Phần vinh hoa, Ngài sẽ ban nhiều và trở lại vỗ về an ủi. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Đây là thời thuận tiện, bây giờ là ngày cứu độ. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Mt 25,31-40)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Khi Con Người đến trong vinh quang của Người, có tất cả các thiên sứ theo hầu, bấy giờ Người sẽ ngự lên ngai vinh hiển của Người. Các dân thiên hạ sẽ được tập hợp trước mặt Người, và Người sẽ tách biệt họ với nhau, như mục tử tách biệt chiên với dê. Người sẽ cho chiên đứng bên phải Người, còn dê ở bên trái. Bấy giờ Đức Vua sẽ phán cùng những người ở bên phải rằng: “Nào những kẻ Cha Ta chúc phúc, hãy đến thừa hưởng vương quốc dọn sẵn cho các ngươi ngay từ thuở tạo thiên lập địa. Vì xưa Ta đói, các ngươi đã cho ăn; Ta khát các ngươi đã cho uống; Ta là khách lạ, các ngươi đã tiếp rước; Ta trần truồng các ngươi đã cho mặc; Ta đau yếu, các ngươi đã thăm viếng; Ta ngồi tù các ngươi đến hỏi han”. Bấy giờ những người công chính sẽ thưa rằng: “Lạy Chúa, có bao giờ chúng con đã thấy Chúa đói mà cho ăn, khát mà cho uống; có bao giờ đã thấy Chúa là khách lạ mà tiếp rước; hoặc trần truồng mà cho mặc? Có bao giờ chúng con đã thấy Chúa đau yếu hoặc ngồi tù, mà đến hỏi han đâu?” Đức Vua sẽ đáp lại rằng: “Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy”.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, chúng con nhận biết những điều kỳ diệu, mà Chúa đã thực hiện nơi tâm hồn thánh nữ Gio-an-na An-ti-đa Tu-rê; Chúa đã yêu mến cuộc sống của thánh nữ, vì đã hoàn toàn thấm nhuần Tin Mừng, chúng con khiêm tốn nài xin Chúa, thương nhận lễ phẩm chúng con dâng tiến. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
nhờ Đức Kitô, Chúa chúng con,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Cha luôn làm sống lại sức mạnh
của Hội Thánh Cha được chứng tỏ
qua niềm tin của các thánh
và cũng biểu lộ cho chúng con tình yêu của Cha.
Ngày hôm nay, chúng con tạ ơn Cha,
vì gương sáng của các ngài khích lệ chúng con
và lời cầu nguyện của các ngài
giúp chúng con hành động để Nước Cha trị đến.
Vì thế, cùng với các thiên thần và toàn thể các thánh,
chúng con hát ca tuyên xưng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Mt 25, 40)</i>
Ta bảo thật các ngươi: mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, trong ngày lễ kính thánh Gio-an-na An-ti-đa Tu-rê, Chúa đã dùng bí tích Thánh Thể nuôi dưỡng chúng con. Xin cho bí tích này vừa đem lại ánh sáng cho tâm hồn, vừa đốt nóng lòng tin yêu của chúng con. Nhờ đó, càng ngày chúng con càng tha thiết sống cuộc đời thánh thiện và chuyên lo làm việc lành phúc đức. 
Chúng con cầu xin...
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

 // 13 Chân phước Mác-ta Vích-ka
  {
    id: 'bl-arta-maria-wiecka',
    date: '05-30',
    title: { 
      vi: 'Chân phước Mác-ta Vích-ka',
      en: 'Bl. Arta Maria Wiecka',
     
    },
    subtitle: {
      vi: 'Trinh nữ',
      en: 'Virgin',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Chân phước Mác-ta Vích-ka sinh ngày 12 tháng 01 năm 1876 tại Nowy Wiec, miền Poméranie, vùng biên giới Ba Lan (Pologne). Từ thời niên thiếu, chân phước đã yêu thích cầu nguyện và phục vụ tha nhân. Năm 18 tuổi, chân phước vào Tập Viện các Nữ Tử Bác Ái của Thánh Vinh Sơn ở Cra-cô-vie. Suốt cuộc đời, chân phước tận hiến cho Thiên Chúa, cho việc phục vụ người nghèo về thể xác cũng như tinh thần. Vì tình yêu đam mê dành cho tất cả mọi người ốm đau, chân phước làm việc không phân biệt quan điểm và tôn giáo. Sơ Mác-ta đã biết yêu đến cùng. Một ngày kia, trước sự nguy hiểm lây bệnh, Sơ Mác-ta tự nguyện, thay thế một nhân viên, một người cha trong gia đình, tẩy uế một căn phòng người mắc bệnh dịch sốt chấy rận. Ít lâu sau, Sơ Mác-ta đã chết ở tuổi 30.
      Sơ Mác-ta được phong chân phước ngày 24 tháng 5 năm 2008, tại Lvov, bên U-crai-na.

        `,
       
en: `
      Marta Maria Wiecka was born on 12 January 1874 in Nowy Wieck, Poland, the third of 13 children born to a wealthy Catholic couple. At the age of two Marta fell seriously ill; when the doctors could do no more for her the Wiecka family asked Mary, the Mother of God of Piseczno, to intercede and she recovered. Marta was known as a good-natured, prayerful child who helped her mother with the chores, often taking care of her siblings, and who had a special devotion to St John Nepomucene.
      On 3 October 1866, Marta made her first Holy Communion. From then on, Jesus became the centre of her life and she never hesitated to walk the 12 kilometres to the parish church in Skarszewy for Mass.
      When she was 16, Marta applied to the Daughters of Charity of St Vincent de Paul in the neighbouring town of Chelmo, but they told her she was too young to enter. Two years later she tried once again to enter the Congregation. Since the Prussian Government, who dominated that part of Poland, had restricted the number of aspirants in the religious community in Chelmo she approached their convent in Krakow and was accepted.
      Marta entered the convent on 26 April 1892. On 12 April 1893, she was clothed as a Daughter of Charity and sent on her first mission to a hospital in Lvov. There she quickly acquired the reputation of a Sister who loved her patients and generously served them. In 1894, she was sent to a hospital in Podhajce where she tirelessly served the sick for five years. On 15 August 1897 she made her first vows as a Daughter of Charity, sealing her commitment to serve God in the poor.
      In 1899 Sr Marta went to the house of her Order in Bochnia. During this period Sr Marta had a vision of Jesus on the Cross; he urged her to endure adversity with patience and promised her that one day she would be with him. This experience strengthened her to endure the adversity which was not long in coming. A mentally ill man, recently released from the hospital where Sr Marta worked, started a rumour that she was pregnant after having an affair with one of her patients - a student who was a nephew of the parish priest. Sr Marta had to live in the midst of the gossip, and remain in Bochnia until time proved her innocence.
      After the unfounded scandal, Sr Marta was sent to serve at the hospital in Sniatyn. She had a wonderful gift for helping people to be reconciled with God, in fact, she let no one in her care die without receiving the Sacrament of Reconciliation.
      Both the life and death of Sr Marta demonstrated acts of selfless love. It was in fact this selflessness which cost her her life. A young man, a nurse and father, was assigned to disinfect the room of a typhoid patient. Sr Marta saw his fear and volunteered to perform the task herself. As a result she contracted typhoid. Many prayed for her recovery; even Jews from the local synagogue held a special prayer service for her. Those present at the moment of her death said that she was in ecstasy after receiving her Lord in Holy Communion for the last time. She died on 30 May 1904 in Sniatyn and was buried there. Her grave quickly became the site of prayer and in the years following World War II it became a symbol of unity since various Christian denomination would gather there.
      She was beatified on Saturday, 24 May 2008 in the Cathedral of Lvov, Ukraine. Cardinal Tarcisio Bertone, S.D.B., Secretary of State presided at the rite of beatification.
      `
},
      massReadings: {
      vi: `

<strong>Ca nhập lễ</strong> (Mt 25, 34. 36- 40)
Chúa phán với những người đã phục vụ anh em mình: “Hãy đến hỡi những kẻ Cha Ta chúc phúc… Ta ốm đau và các ngươi đã thăm viếng. Ta nói thật với các ngươi, mỗi lần các ngươi làm cho một trong những kẻ bé mọn này là các anh em Ta, thì đó là các ngươi đã làm cho chính Ta”.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã ban cho chân phước Mác-ta Vích-ka biết bắt chước tình yêu và sự ân cần của Đức Kitô đối với người ốm đau. Theo gương chân phước, xin Chúa cho chúng con biết nâng đỡ các anh em đang đau khổ, và biết hướng các tâm hồn về với Chúa, là nguồn mạch ơn cứu độ. 
Chúng con cầu xin...

<strong>Bài đọc (Hc 38,1-9)</strong>
<strong>Bài trích sách Huấn Ca</strong>
      Hãy tôn trọng thầy thuốc vì mọi người đều cần đến ông, và vì thiên chức lương y là do Đức Chúa thiết lập. Quả vậy, tài chữa bệnh là do Đấng Tối Cao, ấy là ân tứ Vua Trời ban tặng. Thầy thuốc hiên ngang vì giàu kinh nghiệm, khiến người có địa vị cũng phải nể nang. Thiên Chúa làm cho đất trổ sinh dược liệu; những thứ đó, người khôn chẳng dám coi thường. Chẳng phải nhờ khúc gỗ mà xưa nước ra ngọt khiến cho người ta thấy hiệu năng của khúc gỗ hay sao? Cũng chính Thiên Chúa cho con người được hiểu biết để tôn vinh Người vì những việc lạ Người làm. Nhờ đó, Người chữa lành và chấm dứt cơn đau, còn dược sĩ chỉ làm việc pha chế. Như thế công việc của Người vẫn tiếp tục cho đến khi thiên hạ được an lành. Con ơi, khi đau ốm, con chớ coi thường, nhưng hãy cầu xin Đức Chúa, Người sẽ chữa lành cho.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca</strong>  (Tv 145, 7- 9)
<strong>Đ. Hạnh phúc thay người có tâm hồn nghèo khó, vì Nước Trời là của họ.</strong>
Lạy Chúa Trời xin giữ gìn con.
Chúa xử công minh cho người bị áp bức,
ban lương thực cho kẻ đói ăn, 
Chúa giải phóng những ai tù tội.		    <strong>Đ.</strong>

Chúa mở mắt cho kẻ mù lòa,
Chúa cho kẻ bị dìm xuống đứng thẳng lên,
Chúa yêu chuộng những người công chính.		    <strong>Đ.</strong>

Chúa phù trợ những khách ngoại kiều,
Người nâng đỡ cô nhi quả phụ,
nhưng phá vỡ mưu đồ bọn ác nhân. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (Mt 11, 25)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Lạy Cha là Chúa tể trời đất, con xin chúc tụng Cha, vì Cha đã mạc khải cho những kẻ bé mọn những mầu nhiệm nước trời. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng</strong>  (Mt 11, 25-30)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu/strong>
      Vào lúc ấy, Đức Giêsu cất tiếng nói: “Lạy Cha là Chúa Tể trời đất, con xin ngợi khen Cha, vì Cha đã giấu không cho bậc khôn ngoan thông thái biết những điều này, nhưng lại mạc khải cho những người bé mọn. Vâng, lạy Cha, vì đó là điều đẹp ý Cha.
      Cha tôi đã giao phó cho tôi mọi sự. Và không ai biết rõ người Con, trừ Chúa Cha; cũng như không ai biết rõ Chúa Cha, trừ người Con và kẻ mà người Con muốn mạc khải cho.
      Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng tôi, tôi sẽ cho nghỉ ngơi bồi dưỡng. Anh em hãy mang lấy ách của tôi, và hãy học với tôi, vì tôi có lòng hiền hậu và khiêm nhường. Tâm hồn anh em sẽ được nghỉ ngơi bồi dưỡng. Vì ách của tôi êm ái, và gánh tôi nhẹ nhàng.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lòng thành kính khiêm nhường chúng con dâng lên Chúa nhân ngày lễ chân phước Mác-ta Vích-ka; ước chi nhờ hy lễ tinh tuyền và hoàn hảo này, xin cho chúng con bừng cháy lửa yêu mến Chúa. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Chúa là Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
Chúng con tôn vinh cảm tạ Cha mọi nơi mọi lúc,
thật là chính đáng và phải đạo.
Chúng con ca ngợi những ân cần săn sóc của tình thương Cha
đối với bao người nam người nữ đạt tới sự thánh thiện
bằng việc hiến mình cho Đức Kitô vì Nước Trời.
Nhờ mầu nhiệm giao ước này, Cha cho thân phận con người
tìm lại được vẻ huy hoàng ban đầu, và ngay từ đời này,
chúng con được nếm hưởng trước
những thiện hảo mà Cha sẽ ban cho chúng con ở đời sau.
Vì thế cùng với toàn thể các thiên thần và các thánh,
chúng con hát ca tuyên xưng rằng:  

<strong>Ca hiệp lễ</strong> <i>(Tv 41, 2)</i>
Phúc thay kẻ lưu tâm đến người nghèo khổ:
trong ngày hoạn nạn sẽ được Chúa cứu nguy.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, được bồi dưỡng bánh bởi trời, trong ngày lễ chúng con mừng kính chân phước Mác-ta Vích-ka, chúng con nài xin lòng nhân từ Chúa tha thứ những lỗi lầm chúng con, ban cho xác hồn chúng con sức khỏe, ân phúc và vinh quang bất diệt của Chúa.
Chúng con cầu xin...
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
// 14 Chân phước Marie Madelein Fontaine và các bạn Tử đạo
  {
    id: 'bl-marie-madelein-containe-and-companions-martyrs',
    date: '06-26',
    title: { 
      vi: 'Chân phước Marie Madeleine Fontaine và các bạn Tử đạo',
      en: 'Bl. Marie Madelein Fontaine and Companions Martyrs',
     
    },
    subtitle: {
      vi: 'hân phước Marie Madeleine Fontaine và các bạn Tử đạo',
      en: 'Bl. Marie Madelein Fontaine and Companions Martyrs',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Năm 1794, ngay giữa cuộc cách mạng Pháp, bốn Nữ Tử Bác Ái tại Arras (Pas de Calais) đảm trách việc chăm sóc bệnh nhân tại nhà và giáo dục các bé gái. Đó là các Sơ:
      Sơ Ma-ri-a Mát-len Phông-ten, sinh ngày 22 tháng 4 năm 1723 tại Etrepagny (Eure), gia nhập Tu Hội Nữ Tử Bác Ái ngày 9 tháng 7 năm 1748, là Sơ Phục vụ cộng đoàn.
      Sơ Marie Françoise Lanel, sinh ngày 24 tháng 8 năm 1745 tại Eu (Seine Maritime), được nhận vào Tu Hội ngày 10 tháng 4 năm 1764.
      Sơ Thérèse Fantou, sinh ngày 29 tháng 7 năm 1747, nguyên quán Miniac Morvan (Ille et Vilaine). Nữ Tử Bác Ái từ ngày 28 tháng 11 năm 1771.
      Sơ Jeanne Gérard, sinh tại Cumières (Meuse) ngày 23 tháng 10 năm 1752, gia nhập Tu Hội Nữ Tử Bác Ái ngày 17 tháng 9 năm 1776.
      Vì từ chối tuyên thệ điều mà lương tâm các chị không cho phép, nên các Sơ bị bắt ngày 15 tháng 2 năm 1794 dựa trên những lời vu khống. Trong lúc bị giam, các Sơ an ủi anh em tù nhân cũng bị tố cáo cách bất công như các Sơ. Sau bốn tháng bị giam, các Sơ được chuyển đến Cambrai để bị xử chém. Trên chiếc xe kéo chở các Sơ đến nơi khổ hình, các Sơ hát bài Ave Maris Stella và lần chuỗi. Khi bước lên máy chém, Sơ Ma-ri-a Mát-len Phông-ten lên tiếng quả quyết: “Anh chị em Kitô hữu, anh chị em đừng đau buồn làm gì, anh chị em sẽ không chết đâu, vì chúng tôi là những nạn nhân cuối cùng”. Và đúng như vậy: ngày 26 tháng 6 năm 1794, chấm dứt khủng bố.
      Trong khi đó, chân phước Marguerite Rutan, xuất thân từ nhà Dax. Ngài sinh ngày 23 tháng 4 năm 1736 tại Metz và gia nhập Tập Viện tại một cộng đoàn nhỏ, ngày 23 tháng 4 năm 1757. Sơ được phúc tử đạo bởi việc trảm quyết ở Dax ngày 9 tháng 4 năm 1794.
      Sơ Ma-ri-a Mát-len Phông-ten và các bạn được Đức Thánh Cha Bênêđictô XV phong chân phước ngày 13 tháng 6 năm 1920.
      Còn Sơ Marguerite Rutan được Đức Giáo Hoàng Benedicto XVI phong chân phước ngày 19 tháng 6 năm 2011.

        `,
       
en: `
      In 1794, in the midst of the French Revolution, four Daughters of Charity in Arras (Pas-de-Calais) were dedicated to caring for the sick in their homes and educating young girls. They were:
      Sister Marie-Madeleine Fontaine, born on April 22, 1723, at Etrepagny (Eure), who entered the Company of the Daughters of Charity on July 9, 1748, and was the Sister Servant (Superior) of the community.
      Sister Marie-Françoise Lanel, born on August 24, 1745, at Eu (Seine-Maritime), received into the Company on April 10, 1764.
      Sister Thérèse Fantou, born on July 29, 1747, originally from Miniac-Morvan (Ille-et-Vilaine). A Daughter of Charity since November 28, 1771.
      Sister Jeanne Gérard, born at Cumières (Meuse) on October 23, 1752, who entered the Company of the Daughters of Charity on September 17, 1776.
      Because they refused to take an oath that their consciences forbade, the Sisters were arrested on February 15, 1794, based on calumnies. During their imprisonment, they comforted their fellow prisoners who, like them, had been unjustly accused.
      After four months of confinement, the Sisters were transferred to Cambrai to be guillotined. On the cart that took them to the place of execution, the Sisters sang the Ave Maris Stella and prayed the Rosary.
      As she mounted the scaffold, Sister Marie-Madeleine Fontaine declared: "Christians, do not grieve; you will not die, for we are the last victims." And so it was: on June 26, 1794, the Terror came to an end.
      Meanwhile, Blessed Marguerite Rutan was from the house of Dax. She was born on April 23, 1736, in Metz and entered the Seminary (Novitiate) in a small community on April 23, 1757. She received the grace of martyrdom by the guillotine in Dax on April 9, 1794.
      Sister Marie-Madeleine Fontaine and her companions were beatified by His Holiness Pope Benedict XV on June 13, 1920.
      Sister Marguerite Rutan was beatified by Pope Benedict XVI on June 19, 2011.

`
},
      massReadings: {
      vi: `

<strong>Ca nhập lễ</strong> (Tv 36)
Chúa là niềm vui của người công chính,
là nơi nương tựa của họ trong lúc hiểm nguy.

<strong>Lời nguyện nhập lễ</strong>
Lạy Thiên Chúa toàn năng hằng hữu, Chúa đã ban cho các chân phước Ma-ri-a Mát-len Phông-ten, Maria Phanxica, Têrêxa và Gio-an-na được ơn can đảm chịu chết vì tự do đức tin: nhờ lời chuyển cầu của các ngài, xin cho chúng con biết chịu đựng mọi nghịch cảnh vì tình yêu Đức Kitô và hết sức vươn cao. 
CNgười là Đấng hằng sống và hiển trị muôn đời.

<strong>Bài đọc (1Pr 3, 14-17)</strong>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
      Nếu anh em chịu khổ vì sống công chính, thì anh em thật có phúc! Đừng sợ những kẻ làm hại anh em và đừng xao xuyến. Đức Kitô là Đấng Thánh, hãy tôn Người làm Chúa ngự trị trong lòng anh em. Hãy luôn luôn sẵn sàng trả lời cho bất cứ ai chất vấn về niềm hy vọng của anh em. Nhưng phải trả lời cách hiền hoà và với sự kính trọng. Hãy giữ lương tâm ngay thẳng, khiến những kẻ phỉ báng anh em vì anh em ăn ở ngay thẳng trong Đức Kitô, thì chính họ phải xấu hổ vì những điều họ vu khống, bởi lẽ thà chịu khổ vì làm việc lành, nếu đó là ý của Thiên Chúa, còn hơn là vì làm điều ác.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 30, 3-8;17;25)
<strong>Đ. Trong tay ngài, lạy Chúa, con xin phó thác hồn con.</strong>
Xin Ngài nên như núi đá cho con trú ẩn,
như thành trì để cứu độ con.
Vì danh dự Ngài, xin dẫn đường chỉ lối cho con.		    <strong>Đ.</strong>

Trong tay Ngài, con xin phó thác hồn con,
Ngài đã cứu chuộc con, lạy Chúa Trời thành tín.
Phần con đây, lạy Chúa chỉ tin tưởng nơi Ngài,
được Ngài đoái thương, con vui mừng hớn hở.	    <strong>Đ.</strong>

Xin tỏa ánh tôn nhan rạng ngời
trên tôi tớ Ngài đây, và lấy tình thương mà cứu độ.
Hỡi mọi người cậy trông vào Chúa,
mạnh bạo lên, can đảm lên nào! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (1Pr 4, 14)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Nếu bị sỉ nhục vì danh Đức Kitô, anh em thật có phúc, bởi lẽ Thần Khí vinh hiển và uy quyền, là Thần Khí của Thiên Chúa, ngự trên anh em. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Mt 10,28-33)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
    Khi ấy, Đức Giêsu phán cùng các môn đệ rằng: “Anh em đừng sợ những kẻ giết thân xác mà không giết được linh hồn. Đúng hơn, anh em hãy sợ Đấng có thể tiêu diệt cả hồn lẫn xác trong hỏa ngục. Hai con chim sẻ chỉ bán được một hào phải không? Thế mà, không một con nào rơi xuống đất ngoài ý của Cha anh em. Thì đối với anh em cũng vậy, ngay đến tóc trên đầu anh em, Người cũng đếm cả rồi. Vậy anh em đừng sợ, anh em còn quý giá hơn muôn vàn chim sẻ”.
    “Phàm ai tuyên bố nhận Thầy trước mặt thiên hạ, thì Thầy cũng sẽ tuyên bố nhận người ấy trước mặt Cha Thầy, Đấng ngự trên trời. Còn ai chối Thầy trước mặt thiên hạ, thì Thầy cũng sẽ chối người ấy trước mặt Cha Thầy, Đấng ngự trên trời.”
    <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đoái nhìn lễ vật chúng con dâng tiến Chúa đây: xin Thánh Thần Chúa thánh hoá, và ban cho chúng con sức mạnh của tình yêu, đã giúp cho các chân phước Maria Mát-len, Maria Phanxica, Têrêxa và Gio-an-na vượt thắng mọi gian nan đau khổ. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Chúng con nhận ra được dấu chỉ lạ lùng
của ân sủng Cha trong cuộc tử đạo
của các chân phước Maria Mát-len,
Maria Phanxica, Têrêxa, Gio-an-na và Marguerite Rutan.
Khi dâng hiến tính mạng mình như Đức Kitô,
các chân phước đã tôn vinh danh Cha.
Chính quyền lực của Cha được tỏ hiện trong sự yếu đuối,
khi Cha ban cho các thụ tạo mỏng dòn
được làm chứng cho Cha, nhờ Đức Kitô, Chúa chúng con.
Vì thế, cùng với các thiên thần trên trời,
chúng con ở dưới trần gian thờ lạy Cha và chúc tụng rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 12,24)</i>
Thầy bảo thật anh em, nếu hạt lúa gieo vào lòng đất mà không chết đi, thì nó vẫn trơ trọi một mình; còn nếu chết đi, nó mới sinh được nhiều hạt khác.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, qua cuộc tử đạo của các chân phước, Chúa đã biểu lộ sự huy hoàng của mầu nhiệm thánh giá. Giờ đây, chúng con đã được mạnh sức bởi bí tích Thánh Thể, xin cho chúng con luôn kết hiệp với Đức Kitô, và hoạt động trong Giáo Hội cho sự cứu rỗi nhân loại.
Chúng con cầu xin...
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

// 15 Thánh Phê-rô Gióc Phờ-rát-sa-ti
  {
    id: 'St-pierre-georges-frassat',
    date: '07-04',
    title: { 
      vi: 'Thánh Phê-rô Gióc Phờ-rát-sa-ti',
      en: 'Bl. Pierre Georges Frassat',
     
    },
    subtitle: {
      vi: 'Giáo dân',
      en: 'Layman',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Thánh Pier Giorgio Frassati (1901-1925) là một thanh niên Công giáo người Ý, được biết đến với lòng đạo đức sâu sắc, sự dấn thân mạnh mẽ cho công bằng xã hội và tình yêu bao la dành cho người nghèo. Ngài được Thánh Giáo hoàng Gioan Phaolô II gọi là "Người của Tám Mối Phúc Thật".
      Ngài sinh ngày 6 tháng 4 năm 1901 tại Turin, Ý, trong một gia đình thượng lưu. Mặc dù xuất thân giàu có, Pier Giorgio lại có một trái tim nhạy cảm đặc biệt với những người thiếu thốn. Đời sống thiêng liêng của ngài được nuôi dưỡng bằng việc tham dự Thánh lễ và rước lễ hằng ngày, cùng với lòng sùng kính sâu sắc Bí tích Thánh Thể và Đức Trinh Nữ Maria.
      Khi là sinh viên ngành kỹ thuật khai mỏ, ngài đã tích cực tham gia nhiều hội đoàn Công giáo, bao gồm Hiệp Hội Thánh Vinh Sơn Phaolô và phong trào Công giáo Tiến hành. Ngài dành phần lớn thời gian và tiền bạc của mình để trực tiếp thăm viếng và phục vụ những người nghèo khổ trong các khu ổ chuột ở Turin.
      Pier Giorgio là một thanh niên năng động, yêu thích thể thao, đặc biệt là leo núi (ngài có câu nói nổi tiếng "Verso l'alto" - Hướng lên cao). Ngài cũng là thành viên Dòng Ba Đa Minh.
      Ngài qua đời khi chỉ mới 24 tuổi, vào ngày 4 tháng 7 năm 1925, do bệnh bại liệt cấp tính, căn bệnh mà ngài được tin là đã mắc phải khi phục vụ người bệnh.
      Ngài được Thánh Giáo hoàng Gioan Phaolô II tuyên phong Chân phước vào ngày 20 tháng 5 năm 1990 và được Đức Thánh Cha Lêô XIV tuyên phong Hiển Thánh vào ngày 7 tháng 9 năm 2025.

        `,
       
en: `
    Saint Pier Giorgio Frassati (1901-1925) was an Italian Catholic layman, known for his deep piety, strong commitment to social justice, and immense love for the poor. He was called "The Man of the Eight Beatitudes" by Pope St. John Paul II.
    He was born on April 6, 1901, in Turin, Italy, into an upper-class family. Despite his wealthy background, Pier Giorgio possessed a heart particularly sensitive to those in need. His spiritual life was nourished by daily Mass and Holy Communion, along with a profound devotion to the Eucharist and the Virgin Mary.
    As a mining engineering student, he was actively involved in numerous Catholic associations, including the Society of St Vincent de Paul and Catholic Action. He dedicated much of his time and personal money to directly visiting and serving the poor and sick in the slums of Turin.
    Pier Giorgio was an active young man who loved sports, especially mountain climbing (he famously said "Verso l'alto" - To the heights). He was also a lay member of the Third Order of St. Dominic.
    He died at the young age of 24, on July 4, 1925, from acute poliomyelitis, which he is believed to have contracted while serving the sick.
    He was beatified by Pope St. John Paul II on May 20, 1990 and was canonized as a Saint by Pope Leo XIV on September 7, 2025.

`
},
      massReadings: {
vi: `

<strong>Ca nhập lễ</strong> (Tv 20, 2-3)
Lạy Chúa, Ngài tỏ uy lực khiến nhà vua sung sướng.
Lòng vua ước nguyện sao,
Chúa đã ban như vậy,
miệng vua khấn xin gì,
Ngài cũng không từ chối.

<strong>Lời nguyện nhập lễ</strong>
Lạy Cha, Cha đã ban cho thánh Phêrô Gióc Frát-sa-ti niềm vui được gặp Đức Kitô trong đức tin và lòng bác ái. Nhờ lời chuyển cầu của ngài, xin cho chúng con cũng biết đổ tràn giữa loài người thời đại chúng con, tinh thần các mối phúc của Tin Mừng. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (Pl 3,8-14)
<strong>Bài trích thư của thánh Phaolô tông đồ gửi tín hữu Phi-líp-phê</strong>
      Thưa anh em, tôi coi tất cả mọi sự là thiệt thòi, so với mối lợi tuyệt vời, là được biết Đức Kitô Giêsu, Chúa của tôi. Vì Người, tôi đành mất hết, và tôi coi tất cả như rác, để được Đức Kitô và được kết hợp với Người. Được như vậy, không phải nhờ sự công chính của tôi, sự công chính do luật Môsê đem lại, nhưng nhờ sự công chính do lòng tin vào Đức Kitô, tức là sự công chính do Thiên Chúa ban, dựa trên lòng tin. Vấn đề là được biết chính Đức Kitô, nhất là biết Người quyền năng thế nào nhờ đã phục sinh, cùng được thông phần những đau khổ của Người, với hy vọng có ngày cũng được sống lại từ trong cõi chết.
      Nói thế, không phải là tôi đã đoạt giải, hay đã nên hoàn thiện đâu; nhưng tôi đang cố gắng chạy tới, mong chiếm đoạt, bởi lẽ chính tôi đã được Đức Kitô Giêsu chiếm đoạt. Thưa anh em, tôi không nghĩ là mình đã chiếm được rồi. Tôi chỉ chú ý đến một điều, là quên đi chặng đường đã qua, để lao mình về phía trước. Tôi chạy thẳng tới đích, để chiếm được phần thưởng từ trời cao Thiên Chúa dành cho kẻ được Người kêu gọi trong Đức Kitô Giêsu.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 15)
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (Mt 5, 3)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> ThPhúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Mt 5, 1-12)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Thấy đám đông, Đức Giêsu lên núi. Người ngồi xuống, các môn đệ đến gần bên. Người mở miệng dạy họ rằng:
      “Phúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ.
      Phúc thay ai hiền lành, vì họ sẽ được đất hứa làm gia nghiệp.
      Phúc thay ai sầu khổ, vì họ sẽ được Thiên Chúa ủi an.
      Phúc thay ai khát khao nên người công chính,
      vì họ sẽ được Thiên Chúa cho thỏa lòng.
      Phúc thay ai xót thương người,
      vì họ sẽ được Thiên Chúa xót thương.
      Phúc thay ai có tâm hồn trong sạch,
      vì họ sẽ được nhìn thấy Thiên Chúa.
      Phúc thay ai xây dựng hoà bình,
      vì họ sẽ được gọi là con Thiên Chúa.
      Phúc thay ai bị bách hại vì sống công chính,
      vì Nước Trời là của họ.
      Phúc thay anh em khi vì Thầy mà bị người ta sỉ vả,
      bách hại và vu khống đủ điều xấu xa.
      Anh em hãy vui mừng hớn hở,
      vì phần thưởng dành cho anh em ở trên trời thật lớn lao.”
    <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin nhận lễ tiến dâng của dân Chúa: trong khi chúng con tưởng nhớ tình yêu vô biên của Con Chúa, xin cho chúng con biết theo gương thánh Phê-rô Gióc Phờ-rát-sa-ti, mà yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc
nhờ Đức Kitô, Chúa chúng con,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Cha luôn làm sống lại sức mạnh của Hội Thánh Cha
được chứng tỏ qua niềm tin của các thánh,
và cũng biểu lộ cho chúng con tình yêu của Cha.
Ngày hôm nay, chúng con tạ ơn Cha,
vì gương sáng của các ngài khích lệ chúng con
và lời cầu nguyện của thánh Phê-rô Gióc Phờ-rát-sa-ti,
giúp chúng con hành động để Nước Cha trị đến.
Vì thế, cùng với các thiên thần và toàn thể các thánh,
chúng con tuyên xưng vinh quang Cha rằng:

<strong>Ca hiệp lễ</strong> <i>(Ga 13, 35)</i>
Chúa phán: Điều làm cho mọi người nhận biết anh em là môn đệ của Thầy: là anh em yêu thương nhau.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa là Cha chúng con, nhờ sự hiệp thông với các mầu nhiệm thánh này, xin cứu độ và củng cố dân Chúa trong sự khôn ngoan của Tin Mừng Chúa. 
Chúng con cầu xin...
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

 //  16 Thánh Phan-xi-cô Rê-gi-xê Cờ-lê
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
        vi: `
      Sinh ngày 19 tháng 8 năm 1748 tại Grenoble, Phan-xi-cô Rê-gít Clê được nhận vào Tu Hội Truyền Giáo ở Lyon ngày 6 tháng 3 năm 1769. Thụ phong linh mục ngày 27 tháng 3 năm 1773, ngài được bổ nhiệm làm giám đốc và giáo sư Đại Chủng Viện Annecy. Năm 1788, Phan-xi-cô Rê-gít Clê đến Paris điều hành Nội Chủng Viện (Tập Viện) của Tu Hội. Ngay giữa cơn bão táp cách mạng, ngài xin đi Trung Quốc. Lên tàu tại Lorient, ngày 10 tháng 4 năm 1791, ngài tới Ma-cao ngày 15 tháng 10. Ngài rao giảng Tin Mừng suốt ba mươi năm, chủ yếu trong các tỉnh Kiangsi và Houkouang. Bị bắt tại Kinkiakang ngày 6 tháng 6 năm 1819, Cha Phan-xi-cô Rê-gít Clê bị giam tại Outchangeou. Bị kết án tử hình sau bảy tháng tù, ngài bị thắt cổ chết ngày thứ sáu 18 tháng 2 năm 1820.
      Ngài được phong chân phước ngày 27 tháng 5 năm 1900 và tôn phong hiển thánh ngày 1 tháng 10 năm 2000. Thánh Phan-xi-cô Rê-gít Clê chính là tấm gương nhà truyền giáo hy sinh cả cuộc đời để phục vụ Tin Mừng.
        `,
        en: `
      Francis Regis Clet, the tenth of 15 children, was born into a farm family in Grenoble in the southwest corner of France in 1748 and was named for the recently Canonised fellow-Grenoblian, Jesuit St John Francis Regis (Jean Francois Regis).   After completing studies at the Royal College (founded by the Jesuits), he followed his elder brother and sister into vowed religious life.   In Lyons in 1769, he entered the Congregation of the Mission (Vincentians).   After Ordination, Francis served as professor of moral theology at the Vincentian seminary in Annecy where he was affectionately called “the walking library” because of his encyclopedic knowledge and academic discipline.   In 1786, he became Rector of Annecy and two years later, Director of Novices in Paris.st francois regis-clet-2
      Francis Regis petitioned to go to China as a missionary several times but his superiors did not accede to his request until 1791.   At the age of 43, he replaced another priest who had to withdraw from the assignment at the last minute.   A confrere, in writing about Clet’s assignment to China, noted:  “He has everything you could ask for – holiness, learning, health and charm.”
      After a six month sea journey from France and some transition time in Macao, which included assuming the dress and customs of the Chinese people, the new missioner arrived in Kiang-si in October of 1792 as the only European in the area.   Clet’s acculturation was hampered by his life-long difficulty with the language.   In 1793 Clet joined two Chinese confreres in Hou-Kouang in the Hopei Province where both of his companions died within his first year, one in prison and one from exhaustion.   In that year, Clet became superior of an international group of Vincentian missioners scattered over a very large territory, and he himself pastored an area of 270 thousand square miles.   In that leadership capacity, he developed standards so that there would be a uniform approach to ministry (sacramental and catechetical) among the missioners.
      His own life was simple and austere – he lived like the poor in the country.   His great spirit of mortification accommodated the most diverse regimes and it was on foot that he made his long journeys.   Gentle and humble, he nevertheless showed great firmness inspired by sound and upright judgement.st francois regis clet older
      In 1811, the anti-Christian persecutions in China intensified with the Christians being accused of inciting rebellion against the ruling dynasty.   For several years, Clet endured abuse and attacks, which frequently forced him to find refuge in the mountains.   In 1819, with a generous reward on their heads, Clet and a Chinese confrere became fugitives.   Like Jesus, he was finally betrayed by one of his own, a Catholic schoolmaster whom Clet had challenged for his scandalous behaviour.   Like the missionary St Paul, Clet endured ignominy and forced marches in chains over hundreds of miles.
      During the course of his judgement, Francis Régis Clet was treated with the most extreme inhumanity.   To one of his judges, the holy confessor allowed himself to say:  “My brother, you judge me now, in a short time my Lord Himself will judge you.” A few months later, the magistrate, who fell out of favour, was executed.    On 1 January 1820, Fr Clet was found guilty of deceiving the Chinese people by preaching Christianity and was sentenced to strangulation on a cross.  Pending confirmation of the sentence by the emperor, he wrote: “I prepare for death, often repeating with Saint Paul:  ‘if I live, it is for Jesus Christ and death will be for me a gain’.”   Finally, the emperor Tsiatsïn declared that “the European had deceived and corrupted many people by preaching the Christian religion and that he should be strangled.”   On 18 February Francis Regis Clet was executed.   He was 72 years old, twenty-nine of whom spent in the Chinese mission.st francois regis clet suffering
      As in the case of Jesus, Christians took his body and buried it on a hillside where it rested until it was returned to the Vincentian motherhouse in Paris several decades later and is now honoured at St Lazare.
      St Francis was Beatified on 27 May 1900 by Pope Leo XIII and Canonised on 1 October 2000 by St Pope John Paul II.
        `
      },
      massReadings: {
vi: `

<strong>Ca nhập lễ</strong> (Is 52, 7a)
Đẹp thay, trên đồi núi, bước chân người loan báo Tin Mừng, công bố bình an, người loan tin hạnh phúc, công bố ơn cứu độ.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã sai tôi tớ Chúa là thánh Phan-xi-cô Rê-gít Clê đi rao giảng Tin Mừng cho các quốc gia, và sau cuộc đời hoạt động tông đồ lâu dài của ngài, Chúa đã ban cho ngài triều thiên tử đạo. Xin Chúa đoái thương, dùng sức mạnh Thần khí Chúa, củng cố đức tin cho chúng con trong việc loan báo Tin Mừng. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (2Tm 2, 8-13; 3, 10-12)
<strong>Bài trích thư thứ hai của thánh Phaolô Tông Đồ gởi ông Ti-mô-thê</strong>
      Anh hãy nhớ đến Đức Giêsu Kitô, Đấng đã sống lại từ cõi chết, Đấng xuất thân từ dòng dõi Đavít, như tôi vẫn nói trong Tin Mừng tôi loan báo. Vì Tin Mừng ấy tôi chịu khổ, tôi còn phải mang cả xiềng xích như một tên gian phi. Nhưng Lời Thiên Chúa đâu bị xiềng xích! Bởi vậy tôi cam chịu mọi sự, để mưu ích cho những người Thiên Chúa đã chọn, để họ cũng đạt tới ơn cứu độ trong Đức Kitô Giêsu, và được hưởng vinh quang muôn đời. Đây là lời đáng tin cậy: Nếu ta cùng chết với Người, ta sẽ cùng sống với Người. Nếu ta kiên tâm chịu đựng, ta sẽ cùng hiển trị với Người. Nếu ta chối bỏ Người, Người cũng sẽ chối bỏ ta. Nếu ta không trung tín, Người vẫn một lòng trung tín, vì Người không thể nào chối bỏ chính mình.
      Phần anh, anh đã theo sát đạo lý, cách sống, dự định của tôi; anh đã thấy lòng tin, sự nhẫn nại, lòng yêu mến, sự kiên trì của tôi; anh đã biết những cơn bắt bớ, những sự đau khổ tôi đã gặp ở An-ti-ô-khia, I-cô-ni-ô, Lýt-ra, đã biết tôi chịu bắt bớ như thế nào. Nhưng Chúa đã giải thoát tôi khỏi tất cả. Vả lại, những ai muốn sống đạo đức trong Đức Giêsu Kitô đều sẽ bị bắt bớ.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 125)
<strong>Đ. Ai gieo trong nước mắt sẽ gặt trong tiếng ca.</strong>
Khi Chúa dẫn tù nhân Xi-on trở về,
ta tưởng mình như giữa giấc mơ.
Vang vang ngoài miệng câu cười nói,
rộn rã trên môi khúc nhạc mừng.		    <strong>Đ.</strong>

Bấy giờ trong dân ngoại, người ta bàn tán:
“Việc Chúa làm cho họ, vĩ đại thay!”
Việc Chúa làm cho ta, ôi vĩ đại!
ta thấy mình chan chứa một niềm vui.		    <strong>Đ.</strong>

Họ ra đi, đi mà nức nở,
mang hạt giống vãi gieo.
Lúc trở về, về reo hớn hở,
vai nặng gánh lúa vàng. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong> (Mt 5,10)
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Phúc thay ai bị bách hại vì sống sự công chính, vì Nước Trời là của họ. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Mt 10,34-39)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Đức Giêsu nói với nhóm mười hai tông đồ rằng: “Anh em đừng tưởng Thầy đến đem bình an cho trái đất; Thầy đến không phải để đem bình an, nhưng để đem gươm giáo. Quả vậy, Thầy đến để gây chia rẽ giữa con trai với cha, giữa con gái với mẹ, giữa con dâu với mẹ chồng. Kẻ thù của mình chính là người nhà.
      Ai yêu cha yêu mẹ hơn Thầy, thì không xứng với Thầy. Ai yêu con trai con gái hơn Thầy, thì không xứng với Thầy. Ai không vác thập giá mình mà theo Thầy, thì không xứng với Thầy. Ai giữ lấy mạng sống mình, thì sẽ mất; còn ai liều mất mạng sống mình vì Thầy, thì sẽ tìm thấy được.
      <i>Đó là lời Chúa.</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin nhận của lễ chúng con dâng tiến Chúa trong ngày lễ kính thánh Phan-xi-cô Rê-gít Clê; xin cho lễ vật này trở nên quý giá trước thánh nhan Chúa, như máu của vị thánh tử đạo đã đổ ra. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con.
Chúng con nhận ra dấu chỉ lạ lùng
của ân sủng Cha trong cuộc tử đạo
của thánh Phan-xi-cô Rê-gít Clê
khi dâng hiến cuộc sống ngài như Đức Kitô,
là ngài đã ngợi khen danh thánh Cha.
Chính quyền lực Cha được tỏ hiện
trong sự yếu đuối của những thọ tạo mỏng giòn
để làm chứng cho Cha, nhờ Đức Kitô, Chúa chúng con.
Vì thế, cùng với đạo binh thiên quốc,
chúng con ở dưới trần gian ca ngợi và tung hô Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Mc 16,15; Mt 28,20)</i>
Anh em hãy đi khắp tứ phương thiên hạ, loan báo Tin Mừng cho mọi loài thọ tạo. Và đây, Thầy ở cùng anh em mọi ngày cho đến tận thế.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, chúng con đã hân hoan vui mừng đón nhận lương thực Chúa ban cho chúng con; chúng con nài xin Chúa: vì trong Bí Tích Thánh Thể này chúng con loan báo sự chết và phục sinh của Con Chúa là Đức Giêsu Kitô, xin làm cho chúng con, cùng với thánh Phan-xi-cô tử đạo, được tham dự hạnh phúc đời đời. 
Chúng con cầu xin...
`,
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

 // 17 Thánh Lu-i Mác-ti-nô và Thánh Ma-ri-a Giê-li Ghê-ranh
  {
    id: 'st-louis-martin-and-st-marie-azelie-guerin',
    date: '07-12',
    title: { 
      vi: 'Thánh Lu-i Mác-ti-nô và Thánh Ma-ri-a Giê-li Ghê-ranh',
      en: 'St. Louis Martin and Marie-Azélie Guérin',
     
    },
    subtitle: {
      vi: 'Song thân của Thánh Tê-rê-sa Hài Đồng Giêsu',
      en: 'Parents of St. Thérèse of the Child Jesus',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Các ngài được biết đến nhiều vì là song thân của Thánh Tê-rê-sa Hài Đồng Giêsu, nhưng theo cách riêng mình, các ngài cũng là những mẫu gương thánh thiện để chúng ta noi theo. Các ngài là đôi vợ chồng đầu tiên được phong thánh.
      Thánh Lu-i Mác-ti-nô sinh tại Bourdeaux ngày 22 tháng 8 năm 1823. Là một thanh niên có một đức tin sâu sắc và chuyên chăm cầu nguyện, có thời ông đã mong mỏi được dâng hiến cho Thiên Chúa trong nhà tế bần của Thánh Cả Bernard, nhưng gặp khó khăn trong việc học tiếng Latin, ông đành trở thành một thợ đồng hồ và định cư tại Alençon.
      Thánh Ma-ri-a Giê-li Ghê-ranh sinh tại Gandelain, gần Saint-Denis-sur Sarthon, vào ngày 23 Tháng 12 năm 1831. Cô đã làm việc như một người thợ thêu thùa tại Alençon. Cô cũng đã từng bị cuốn hút bởi đời sống các nữ tu, nhưng sức khỏe không ổn định của mình và những nhận xét tiêu cực của sơ bề trên dòng Nữ Tử Bác Ái tại Alençon làm cô nản lòng.
      Ơn Chúa quan phòng, Giê-li gặp được Lu-i trên cầu Thánh Leonard: cô gặp được một thanh niên mà những đức tính cao quý của anh, cung cách kính cẩn và vẻ trang nghiêm của anh đã để lại cho cô một ấn tượng sâu sắc. Một giọng nói trong lặng lẽ thì thầm: “Đây là người đàn ông đã dành sẵn cho con”. Họ đã kết hôn vài tháng sau đó tại nhà thờ Đức Bà thành Alençon, vào đêm 13 tháng 6, năm 1858.
      Họ có nhiều niềm vui khi chào đón đến chín đứa con. Bốn người con đã chết trong thời thơ ấu, nhưng điều đó không dìm họ trong đau buồn cũng không làm suy yếu được đức tin sâu sắc của họ, họ vẫn kiên trì tham dự thánh lễ hàng ngày và có lòng sùng kính đặc biệt với Đức Trinh Nữ Maria. Người con gái cuối cùng của họ là thánh nữ Têrêsa Hài Đồng Giêsu, tiến sĩ Hội Thánh.
      Lu-i Mác-ti-nô và Giê-li Ghê-ranh là những gương mẫu tuyệt vời của tình yêu vợ chồng, của một gia đình Kitô giáo cần cù lo lắng cho người khác, hào phóng với người nghèo và được linh hứng từ một tinh thần truyền giáo mẫu mực, luôn sẵn sàng giúp đỡ các hoạt động của giáo xứ. Hơn nữa Lu-i Mác-ti-nô là một thành viên tích cực của Hiệp hội Thánh Vinh Sơn Phaolô trong suốt cuộc đời của mình.
      Giê-li Ghê-ranh qua đời tại Alencon ngày 28 tháng 8 năm 1877 sau một thời gian dài bệnh tật. Lu-i Mác-ti-nô chuyển đến Lisieux để bảo đảm một tương lai tốt hơn cho năm cô con gái của mình. Sau khi dâng lên Thiên Chúa tất cả những người con gái của mình, ông cố, như người ta thường gọi ông, can đảm chịu đựng nhiều đau đớn vì một căn bệnh. Ông qua đời gần Evreux ngày 29 tháng 7 năm 1894.
      Các ngài được phong chân phước tại Lisieux vào ngày 19 tháng 10 năm 2008. Và vào ngày 18 tháng 10 năm 2015, Đức Giáo Hoàng Phanxicô đã nâng hai ngài lên bậc hiển thánh tại quảng trường thánh Phêrô.

         `,
       
en: `
      This couple is best known as the parents of St. Therese of Lisieux (the Little Flower), but they are models of holiness in their own right. They are only the second married couple to be canonized.
      Louis was born in 1823 in Bordeaux. When his hope of entering religious life was thwarted he became a watchmaker. Zelie Guerin was born in 1831. She, too, hoped to become a religious, but eventually understood that it was not God’s will. She became a successful lace-maker.
      Louis and Zelie met in Alencon and were married in 1858 after a three-month courtship. For almost a year the couple lived as celibates, but the advice of a confessor changed their minds and they decided to raise as many children as possible for the glory of God. Zelie gave birth to nine children, five of whom entered religious life.
      The family lived a comfortable lifestyle, but they also suffered the loss of four children at an early age and had to deal with a rebellious daughter. Their devotion never wavered, however. The couple lived modestly, reached out to the poor and the needy, and led daily prayers in the household. St. Therese would later write: “God gave me a father and a mother who were more worthy of heaven than of earth.”
      In 1877, at age 45, Zelie Martin died of breast cancer. Louis and his daughters moved to Lisieux. Gradually his daughters left to enter the convent. Despite his loneliness he said: “It is a great, great honor for me that the Good Lord desires to take all of my children. If I had anything better, I would not hesitate to offer it to him.” Louis died in 1894 after suffering greatly, including a three-year stay in a psychiatric hospital.
      Louis and Zelie Martin were beatified by Pope Benedict XVI in 2008 and canonized by Pope Francis in 2015. Their feast day is July 12, though a liturgical celebration in their honor is not included in the current General Roman Calendar.
`
},
      massReadings: {
vi: `

<strong>Ca nhập lễ </strong>(Tv 1, 1-3)
Phúc thay cho người tin tưởng vào Chúa,
và có Chúa làm chốn nương thân.
Người ấy như cây trồng bên dòng nước,
đâm rễ sâu vào mạch suối trong,
chẳng sợ chi khi mùa nóng đến,
lá trên cành vẫn cứ xanh tươi.

<strong>Lời nguyện nhập lễ</strong>
Lạy Thiên Chúa, Đấng đã ban cho thánh Lu-i Mác-ti-nô và thánh Ma-ri-a Giê-li Ghê-ranh ân sủng để dẫn đến một đời sống thánh thiện trong bậc vợ chồng và cha mẹ Kitô giáo. Nhờ lời chuyển cầu và gương sáng của các ngài, xin Chúa ban ơn cho chúng con biết yêu thương và phục vụ Chúa một cách trung thành và sống xứng đáng với ơn gọi của chúng con. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (Kn 18, 6-9)
<strong>Bài trích sách Khôn Ngoan</strong>
      Chính đêm ấy, đã được báo trước cho cha ông chúng con,
      để khi biết chắc lời hứa mình tin là lời hứa nào
      các ngài thêm can đảm.
      Dân Chúa đã trông đợi đêm ấy
      như đêm cứu thoát người chính trực và tiêu diệt kẻ địch thù.
      Quả vậy, Chúa dùng hình phạt giáng xuống đối phương
      để làm cho chúng con được rạng rỡ
      và kêu gọi chúng con đến với Ngài.
      Con lành cháu thánh của những người lương thiện
      âm thầm dâng lễ tế trong nhà.
      Họ đồng tâm nhất trí về luật sau đây của Thiên Chúa,
      là trong dân thánh, có phúc cùng hưởng, có họa cùng chia.
      Và ngay từ bấy giờ,
      họ đã xướng lên những bài ca do cha ông truyền lại.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca</strong> (Tv 32, 1-22)
<strong>Đ. Phúc thay dân tộc mà Chúa chọn làm cơ nghiệp riêng mình.</strong>
Người hiền đức, hãy hân hoan trong Chúa,
ca ngợi Chúa là việc của những kẻ lòng ngay.
Phúc thay quốc gia mà Chúa là Chúa tể,
dân tộc mà Chúa chọn làm cơ nghiệp riêng mình.		    <strong>Đ.</strong>

Kìa Chúa để mắt trông coi những kẻ kính sợ Ngài,
nhìn xem những ai cậy trông ân sủng của Ngài,
để cứu gỡ họ khỏi tay thần chết,
và nuôi dưỡng họ trong cảnh cơ hàn.		    <strong>Đ.</strong>

Linh hồn chúng con mong đợi Chúa,
chính Ngài là Đấng phù trợ và che chở chúng con.
Lạy Chúa, xin đổ lòng từ bi xuống trên chúng con,
theo như chúng con tin cậy ở nơi Ngài. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Chúa phán: “Thầy là đường, là sự thật và là sự sống: không ai đến được với Cha mà không qua Thầy”. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Lc 12,32-48)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Luca</strong>
      Khi ấy, Chúa Giêsu phán cùng các môn đệ rằng: “Hỡi đoàn chiên nhỏ bé, đừng sợ, vì Cha anh em đã vui lòng ban Nước của Người cho anh em. Hãy bán tài sản của mình đi mà bố thí. Hãy sắm lấy những túi tiền không hề cũ rách, một kho tàng không thể hao hụt ở trên trời, nơi kẻ trộm không bén mảng, mối mọt không đục phá. Vì kho tàng của anh em ở đâu, thì lòng anh em ở đó”.
      “Anh em hãy thắt lưng cho gọn, thắp đèn cho sẵn. Hãy làm như những người đợi chủ đi ăn cưới về, để khi chủ vừa về tới và gõ cửa, là mở ngay. Khi chủ về mà thấy những đầy tớ ấy đang tỉnh thức, thì thật là phúc cho họ. Thầy bảo thật anh em: chủ sẽ thắt lưng, đưa họ vào bàn ăn, và đến bên từng người mà phục vụ. Nếu canh hai hoặc canh ba ông chủ mới về, mà còn thấy họ tỉnh thức như vậy, thì thật là phúc cho họ. Anh em hãy biết điều này: nếu chủ nhà biết giờ nào kẻ trộm đến, hẳn ông đã không để nó khoét vách nhà mình đâu. Anh em cũng vậy, hãy sẵn sàng, vì chính giờ phút anh em không ngờ, thì Con Người sẽ đến”.
      Bấy giờ ông Phê-rô hỏi: “Lạy Chúa, Chúa nói dụ ngôn này cho chúng con hay cho tất cả mọi người?” Chúa đáp: “Vậy thì ai là người quản gia trung tín, khôn ngoan, mà ông chủ sẽ đặt lên coi sóc kẻ ăn người ở, để cấp phát phần thóc gạo đúng giờ đúng lúc? Khi chủ về mà thấy đầy tớ ấy đang làm như vậy, thì thật là phúc cho anh ta. Thầy bảo thật anh em, ông sẽ đặt anh ta lên coi sóc tất cả tài sản của mình. Nhưng nếu người đầy tớ ấy nghĩ bụng: Chủ ta còn lâu mới về, và bắt đầu đánh đập tôi trai tớ gái và chè chén say sưa, chủ của tên đầy tớ ấy sẽ đến vào ngày hắn không ngờ, vào giờ hắn không biết, và ông sẽ loại hắn ra, bắt phải chung số phận với những tên thất tín”.
      “Đầy tớ nào đã biết ý chủ mà không chuẩn bị sẵn sàng, hoặc không làm theo ý chủ, thì sẽ bị đòn nhiều. Còn kẻ không biết ý chủ mà làm những chuyện đáng phạt, thì sẽ bị đòn ít. Hễ ai đã được cho nhiều thì sẽ bị đòi nhiều, và ai được giao phó nhiều thì sẽ bị đòi hỏi nhiều hơn”.
      <i>Đó là Lời Chúa</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Thiên Chúa toàn năng, chúng con tha thiết nài xin Chúa thương chấp nhận của lễ chúng con dâng để mừng kính các thánh. Xin cho hiến lễ này cũng thanh tẩy cả hồn xác chúng con. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Chúa là Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
nhờ Ðức Ki-tô, Chúa chúng con,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con,
vì Cha dùng đời sống đức tin kỳ diệu của các thánh
như một năng lực luôn luôn mới
mà làm cho Hội Thánh nên phong phú,
và Cha tỏ cho chúng con thấy
những dấu chứng thật chắc chắn về tình yêu của Cha.
Hơn nữa, để hoàn tất chương trình cứu độ,
chúng con cũng được gương sáng đặc biệt của các ngài thôi thúc,
và luôn được các ngài sốt sắng chuyển cầu trước nhan Cha.
Vì thế, lạy Cha, cùng với toàn thể Thiên Thần và các Thánh,
chúng con tuyên xưng Cha và hân hoan tung hô rằng:  

<strong>Ca hiệp lễ</strong> <i>(Lc 12, 33-34)</i>
Chúa phán:  Hãy sắm lấy những túi tiền không hề cũ rách, một kho tàng không thể hao hụt ở trên trời, nơi kẻ trộm không bén mảng, mối mọt không đục phá. Vì kho tàng của anh em ở đâu, thì lòng anh em ở đó.
  
<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, trong ngày lễ kính thánh Lu-i Mác-ti-nô và thánh Ma-ri-a Giê-li Ghê-ranh, Chúa đã dùng bí tích Thánh Thể bồi dưỡng chúng con. Xin cho ân phúc Chúa đã thương ban do lượng từ bi hải hà của Chúa giúp chúng con đạt tới hạnh phúc muôn đời.
Chúng con cầu xin...
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

 // 18 Thánh Giút-ti-nô Gia-co-bi
  {
    id: 'st-giustino-de-jacobis',
    date: '07-30',
    title: { 
      vi: 'Thánh Giút-ti-nô Gia-co-bi ',
      en: 'St. Giustino de Jacobis',
     
    },
    subtitle: {
      vi: 'Tu Hội Truyền Giáo - Giám mục',
      en: 'Congregation of the Mission - Bishop',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Giút-ti-nô Gia-co-bi sinh ngày 9 tháng 10 năm 1800 tại San Fele trong vương quốc Naples. Được nhận vào Tu Hội Truyền Giáo ngày 17 tháng 10 năm 1818 tại Naples, ngài thụ phong linh mục tại Brindisi ngày 12 tháng 6 năm 1824. Được giao nhiệm vụ rao giảng Tin Mừng cho người nghèo, ngài tham gia suốt mười lăm năm vào các sứ mạng giáo xứ ở miền nam nước Ý, bị dịch tả tàn phá năm 1836.
      Ngày 10 tháng 3 năm 1839, Thánh Bộ Truyền Bá Đức Tin sai ngài đến Phi Châu thành lập một điểm truyền giáo tại Abyssinie. Cha Giút-ti-nô Gia-co-bi được bổ nhiệm làm Giám quản Tông tòa ở Éthiopie và các vùng kế cận. Tới Adoua ngày 29 tháng 10 năm 1839, ngài đến ở Gouala ngày 10 tháng 12 năm 1844, khi đó điểm truyền giáo chỉ có vài trăm Kitô hữu, thường xuyên bị bách hại bởi hàng giáo sĩ theo nghi lễ Copte và thủ lãnh của họ ở Adoua do sự ác tâm và lơ là của chính quyền dân sự địa phương. Cha Giút-ti-nô Gia-co-bi thụ phong giám mục ngày 7 tháng giêng năm 1849. Trong hai mươi mốt năm, Đức Cha Giút-ti-nô Gia-co-bi sinh động hóa các cộng đoàn Kitô hữu thiểu số trong một bầu khí thù địch. Nhiều lần ngài trải qua cảnh lưu vong và lao tù. Khẩu hiệu của ngài: “Tất cả cho Chúa” tóm tắt đầy đủ đời sống tông đồ của vị mục tử nhân lành hoàn toàn dâng hiến cho Thiên Chúa và cho sứ mạng truyền giáo của ngài. Như thánh Phaolô, thánh Giút-ti-nô Gia-co-bi chỉ sống cho dân Chúa mà Hội Thánh đã giao phó cho ngài. Ngài viết trong một lá thư mục vụ: “Anh chị em là chủ cuộc đời tôi, bởi vì Chúa đã ban cho tôi sự sống này vì anh chị em”.
      Trong một chuyến đi kinh lý mục vụ trong thung lũng Aligade, Đức Cha Giút-ti-nô Gia-co-bi qua đời ngày 31 tháng 7 năm 1860 và được mai táng ở Hebo. Ngày 25 tháng 6 năm 1939, ngài được Đức Thánh Cha Piô XII phong chân phước và Đức Phaolô VI tôn phong hiển thánh ngày 26 tháng 10 năm 1975.

        
        `,
       
en: `
      Justin de Jacobis was born on October 9, 1800, at San Fele in the Kingdom of Naples. He was received into the Congregation of the Mission on October 17, 1818, in Naples, and was ordained a priest at Brindisi on June 12, 1824.
      Assigned to evangelize the poor, he participated for fifteen years in parish missions in southern Italy, which was ravaged by cholera in 1836. On March 10, 1839, the Sacred Congregation for the Propagation of the Faith sent him to Africa to establish a mission in Abyssinia. Father Justin de Jacobis was appointed Apostolic Prefect of Ethiopia and the surrounding regions.
      Arriving in Adoua on October 29, 1839, he settled in Gouala on December 10, 1844. At that time, the mission consisted of only a few hundred Christians, who were frequently persecuted by the clergy of the Coptic rite and their leaders in Adoua, due to the malice and negligence of the local civil authorities.
      Father Justin de Jacobis was consecrated a bishop on January 7, 1849. For twenty-one years, Bishop Justin de Jacobis animated the minority Christian communities in a hostile atmosphere. He experienced exile and imprisonment many times. His motto, "All for God," perfectly summarizes the apostolic life of this good shepherd, who was completely dedicated to God and to his mission.
      Like Saint Paul, Saint Justin de Jacobis lived only for the people of God whom the Church had entrusted to him. He wrote in a pastoral letter: "You are the masters of my life, because the Lord has given me this life for you."
      During a pastoral visit in the Aligade valley, Bishop Justin de Jacobis died on July 31, 1860, and was buried at Hebo.
      On June 25, 1939, he was beatified by His Holiness Pope Pius XII, and canonized as a saint by Pope Paul VI on October 26, 1975.

`
},
      massReadings: {
vi: `

<strong>Ca nhập lễ</strong>
Chúng ta hãy mừng kính thánh Giút-ti-nô Gia-cô-bi, người đã được vinh dự công bố chân lý Đức Kitô trao ban.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, Chúa đã muốn cho Thánh Giám mục Giút-ti-nô Gia-cô-bi trở nên tất cả cho mọi người để đem Tin Mừng đến nước Éthiopie. Xin Chúa cho chúng con, nhờ lời ngài chuyển cầu, biết công bố Tin Mừng và qui tụ các dân tộc trong sự hiệp nhất của đức tin. 
Chúng con cầu xin...

<strong>Bài đọc</strong> (Ed 34,11-16)
<strong>Bài trích sách Ngôn sứ Êdêkien</strong>
      Đức Chúa là Chúa Thượng phán thế này: Đây, chính Ta sẽ chăm sóc chiên của Ta và thân hành kiểm điểm. Như mục tử kiểm điểm đàn vật của mình vào ngày người ấy ở giữa đàn chiên bị tản mác thế nào, thì Ta cũng sẽ kiểm điểm chiên của Ta như vậy. Ta sẽ kéo chúng ra khỏi mọi nơi chúng đã bị tản mác, vào ngày mây đen mù mịt. Ta sẽ đem chúng ra khỏi các dân, tập họp chúng lại từ các nước và đưa chúng vào đất của chúng. Ta sẽ chăn dắt chúng trên các núi Ít-ra-en, trong các thung lũng và tại mọi nơi trong xứ có thể ở được. Ta sẽ chăn dắt chúng trong đồng cỏ tốt tươi và chuồng của chúng sẽ ở trên các núi cao Ít-ra-en. Tại đó chúng sẽ nằm nghỉ trong chuồng êm ái, sẽ đi ăn trong đồng cỏ mầu mỡ trên núi non Ít-ra-en. Chính Ta sẽ chăn dắt chiên của Ta, chính Ta sẽ cho chúng nằm nghỉ - sấm ngôn của Đức Chúa là Chúa Thượng. Con nào bị mất, Ta sẽ đi tìm; con nào đi lạc, Ta sẽ đưa về; con nào bị thương, Ta sẽ băng bó; con nào bệnh tật, Ta sẽ làm cho mạnh; con nào béo mập, con nào khỏe mạnh, Ta sẽ canh chừng. Ta sẽ theo lẽ chính trực mà chăn dắt chúng.
      <i>Đó là Lời Chúa.</i>  

<strong>Đáp ca</strong> (Tv 22)
<strong>Đ. Người vừa là Chiên vừa là Mục Tử,
là Vua và là người Tôi tớ.</strong>
Chúa là mục tử chăn dắt tôi,
tôi chẳng thiếu thốn gì.
Trong đồng cỏ xanh tươi,
Người cho tôi nằm nghỉ.		    <strong>Đ.</strong>

Người đưa tôi tới dòng nước trong lành,
và bổ sức cho tôi.
Người dẫn tôi trên đường ngay nẻo chính
vì danh dự của Người.		    <strong>Đ.</strong>

Lạy Chúa, dầu qua lũng âm u
con sợ gì nguy khốn, vì có Chúa ở cùng.
Côn trượng Ngài bảo vệ, con vững dạ an tâm.  		    <strong>Đ.</strong>  

Chúa dọn sẵn cho con bữa tiệc
ngay trước mặt quân thù.
Đầu con, Chúa xức đượm dầu thơm,
ly rượu con đầy tràn chan chứa.  		    <strong>Đ.</strong>  

Lòng nhân hậu và tình thương Chúa
ấp ủ tôi suốt cả cuộc đời,
và tôi được ở đền Người
những ngày tháng, những năm dài triền miên. 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> “Thầy không còn gọi anh em là tôi tớ nữa, vì tất cả những gì Thầy nghe được nơi Cha của Thầy, Thầy đã cho anh em biết”. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Ga 17,6-19)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>
      Trước khi bỏ thế gian mà về cùng Cha, Chúa Giêsu ngước mắt lên trời và cầu nguyện rằng:
      Những kẻ Cha đã chọn từ giữa thế gian mà ban cho con, con đã cho họ biết danh Cha. Họ thuộc về Cha, Cha đã ban họ cho con, và họ đã tuân giữ lời Cha. Giờ đây, họ biết rằng tất cả những gì Cha ban cho con đều do bởi Cha, vì con đã ban cho họ lời mà Cha đã ban cho con; họ đã nhận những lời ấy, họ biết thật rằng con đã từ Cha mà đến, và họ đã tin là Cha đã sai con.
      Con cầu nguyện cho họ. Con không cầu nguyện cho thế gian, nhưng cho những kẻ Cha đã ban cho con, bởi vì họ thuộc về Cha. Tất cả những gì của con đều là của Cha, tất cả những gì của Cha đều là của con; và con được tôn vinh nơi họ. Con không còn ở trong thế gian nữa, nhưng họ, họ ở trong thế gian; phần con, con đến cùng Cha.
      Lạy Cha chí thánh, xin gìn giữ các môn đệ trong danh Cha mà Cha đã ban cho con, để họ nên một như chúng ta. Khi còn ở với họ, con đã gìn giữ họ trong danh Cha mà Cha đã ban cho con, con đã canh giữ, và không một ai trong họ phải hư mất, trừ đứa con hư hỏng, để ứng nghiệm lời Kinh Thánh. Bây giờ, con đến cùng Cha, và con nói những điều này lúc còn ở thế gian, để họ được hưởng trọn niềm vui của con. Con đã truyền lại cho họ lời của Cha, và thế gian đã ghét họ, vì họ không thuộc về thế gian, cũng như con đây không thuộc về thế gian. Con không xin Cha cất họ khỏi thế gian, nhưng xin Cha gìn giữ họ khỏi ác thần. Họ không thuộc về thế gian cũng như con đây không thuộc về thế gian. Xin Cha lấy sự thật mà thánh hiến họ. Lời Cha là sự thật. Như Cha đã sai con đến thế gian, thì con cũng sai họ đến thế gian. Vì họ, con xin thánh hiến chính mình con, để nhờ sự thật, họ cũng được thánh hiến.
      <i>Đó là Lời Chúa</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin ghé mắt nhân từ thương nhận lễ vật dân Chúa dâng trên bàn thờ, trong ngày mừng kính thánh Giút-ti-nô Gia-cô-bi; nhờ hiệu lực của bí tích này, xin giúp chúng con sống thế nào để người đời nhìn thấy Đức Giêsu đang sống trong chúng con. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc
nhờ Đức Kitô, Chúa chúng con,
thật là chính đáng và phải đạo.
Hôm nay, mừng lễ thánh Giút-ti-nô Gia-cô-bi,
chúng con cảm nhận lòng ân cần của Cha đối với Giáo Hội:
nhờ gương sáng của người, Cha khích lệ chúng con;
nhờ lời người giảng dạy, Cha soi sáng chúng con;
nhờ lời chuyển cầu của người, Cha hộ trì chúng con.
Vì vậy, cùng toàn thể các thiên thần và các thánh,
chúng con ca khen vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Mc 8, 35)</i>
Chúa phán: “Ai liều mất mạng mình vì tôi và vì Tin Mừng thì sẽ cứu được mạng sống mình”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, trong ngày chúng con mừng lễ thánh Giút-ti-nô Gia-cô-bi, Chúa đã nuôi dưỡng chúng con bằng bánh Con Chúa. Chúng con nài xin Chúa cho việc được tham dự bí tích Thánh Thể này thánh hóa chúng con, để trở nên như những gì chúng con được lãnh nhận. 
Chúng con cầu xin...
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

  // 19 Chân phước Ghê-brê Mi-ca-e
  {
    id: 'st-ghebre-michael',
    date: '08-30',
    title: { 
      vi: 'Chân phước Ghê-brê Mi-ca-e',
      en: 'Bl. Ghebre Michael',
     
    },
    subtitle: {
      vi: 'Tu Hội Truyền Giáo - Linh mục, Tử đạo',
      en: 'Congregation of the Mission - Priest, Martyr',
      
    },
    type: 'Lễ nhớ',
    sections: {
      biography: {
        vi: `
      Chân phước Ghê-brê Mi-ca-e (nghĩa là "Đầy tớ của Thiên thần Mi-ca-e") sinh vào khoảng năm 1788 hoặc 1791 trong một gia đình Chính thống giáo tại miền Godjam, Ethiopie. Ngài nhận được sự giáo dục tại một trường dòng và sau đó trở thành một đan sĩ. Ngài nổi tiếng về sự uyên bác, và vào năm 1813, ngài được nhận danh hiệu "Tiến sĩ Khoa học Hội Thánh".
      Tuy nhiên, với lòng khao khát tìm kiếm chân lý, ngài đã bắt đầu một cuộc hành hương tri thức qua các tu viện danh tiếng (1814-1825), nghiên cứu sâu về Kinh Thánh, các Giáo phụ và các Công đồng đầu tiên.
      Bước ngoặt cuộc đời ngài xảy ra khi ngài tham gia phái đoàn đến Cairo (Ai Cập) để thỉnh cầu một giám mục mới cho Ethiopie. Đi cùng phái đoàn là một linh mục Công giáo, Cha Giút-ti-nô Gia-co-bi (sau là Thánh Giám mục Justin de Jacobis). Cha Giút-ti-nô đã đưa phái đoàn đến Rôma vào năm 1842 để yết kiến Đức Giáo Hoàng Grêgôriô XVI. Tại Rôma, Ghê-brê Mi-ca-e khám phá ra rằng đức tin Công giáo hoàn toàn phù hợp với Giáo hội Ethiopie cổ xưa.
      Khi trở về vào tháng 2 năm 1844, ngài đã xin Đức Cha Giút-ti-nô Gia-co-bi cho mình được gia nhập Giáo hội Công giáo. Ngài tìm thấy nơi Đức Cha một người thầy và một người cha thiêng liêng. Vào ngày 1 tháng 1 năm 1851, ngài được Đức Cha Giút-ti-nô bí mật truyền chức linh mục. Sau đó, ngài trở thành giáo sư và giám đốc tiểu chủng viện. Ngài cũng đã xin gia nhập Tu Hội Truyền Giáo (Vinh Sơn).
      Năm 1853, Hoàng đế Théodoros và Giám mục Coptic Abouna Salama bắt đầu cuộc bách hại dữ dội chống lại người Công giáo. Vào tháng 7 năm 1854, Cha Ghê-brê Mi-ca-e bị bắt. Ngài bị tra tấn dã man, bị đánh đập (đến mức có tin đồn ngài đã chết) và bị xiềng xót.
      Sau hơn một năm chịu đựng sự giam cầm và tra tấn khủng khiếp, ngài qua đời vì kiệt sức trong một cuộc đi bộ cưỡng bức vào ngày 28 tháng 8 năm 1855. Khi Đức Cha Giút-ti-nô Gia-co-bi báo tin về cái chết của ngài cho Bề trên Tổng quyền, ngài gọi Cha Ghê-brê Mi-ca-e là một "tập sinh" và "chủng sinh" của Tu Hội Truyền Giáo.
      Ngài được Đức Thánh Cha Piô XI phong chân phước như một vị tử đạo vào ngày 3 tháng 10 năm 1926.
        `,
       
en: `
      Blessed Ghebre-Michael (meaning "Servant of the Angel Michael") was born around 1788 or 1791 into an Orthodox family in the Godjam province of Ethiopia. He received his education at a monastic school and later became a monk. He was renowned for his learning and, in 1813, received the title "Doctor of Ecclesiastical Sciences."
      However, with a thirst for finding the truth, he began a pilgrimage of knowledge to prestigious monasteries (1814-1825), deeply studying Sacred Scripture, the Fathers of the Church, and the first Councils.
      The turning point in his life occurred when he joined a commission sent to Cairo (Egypt) to request a new bishop for Ethiopia. Accompanying them was a Catholic priest, Fr. Justin de Jacobis (later Saint Bishop Justin de Jacobis). Fr. de Jacobis took the delegates to Rome in 1842 to pay their respects to Pope Gregory XVI. In Rome, Ghebre-Michael discovered that the Catholic faith was in harmonious continuity with the ancient Ethiopian Church.
      Upon his return in February 1844, he asked Bishop Justin de Jacobis to be received into the Catholic Church. He found in the Bishop a teacher and a spiritual father. On January 1, 1851, he was secretly ordained a priest by Bishop de Jacobis. He then became a professor and rector of the minor seminary. He also requested admission into the Congregation of the Mission (the Vincentians).
      In 1853, Emperor Théodoros and the Coptic Bishop Abouna Salama began a fierce persecution against Catholics. In July 1854, Fr. Ghebre-Michael was arrested. He was brutally tortured, beaten (so badly that rumors of his death spread), and put in chains.
      After more than a year of enduring terrible imprisonment and torture, he died of exhaustion during a forced march on August 28, 1855. When Bishop de Jacobis informed his Superior General of the death, he called Fr. Ghebre-Michael a "postulant" and "seminarian" of the Congregation of the Mission.
      He was beatified as a martyr by His Holiness Pope Pius XI on October 3, 1926.

`
},
      massReadings: {
vi: `

<strong>Ca nhập lễ</strong>
Ghê-brê thực sự là vị tử đạo, vì người đã đổ máu vì danh Đức Kitô. Người đã không sợ những đe dọa, và người đã vào Nước Trời.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, với lòng thương xót, Chúa đã hướng dẫn chân phước Ghê-brê Mi-ca-e, tử đạo, đến chỗ nhận biết đức tin chân thật, và Chúa đã ban cho ngài một lòng can đảm đáng khâm phục để làm chứng cho Chúa; Nhờ công nghiệp và lời chuyển cầu của ngài, xin Chúa ban cho tất cả các quốc gia được nhận biết Chúa, Thiên Chúa thật duy nhất, và Đấng được Chúa sai đến, Đức Giêsu Kitô, Con Chúa, Chúa chúng con, Đấng hằng sống và hiển trị cùng Chúa, hiệp nhất với Chúa Thánh Thần đến muôn thuở muôn đời.
Chúng con cầu xin...

<strong>Bài đọc</strong> (Hr 10, 32-36)
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
      Xin anh em nhớ lại những ngày đầu: lúc vừa được ơn chiếu sáng, anh em đã phải đối phó với bao nỗi đau khổ dồn dập. Khi thì anh em bị sỉ nhục và hành hạ trước mặt mọi người, khi thì phải liên đới với những người cùng cảnh ngộ. Quả thật, anh em đã thông phần đau khổ với những người bị tù tội, và đã vui mừng để cho người ta tước đoạt của cải, bởi biết rằng mình có những của vừa quý giá hơn lại vừa bền vững. Vậy, anh em đừng đánh mất lòng tin tưởng mạnh dạn của anh em; lòng tin tưởng đó sẽ mang lại một phần thưởng lớn lao. Anh em cần phải kiên nhẫn, để sau khi thi hành ý Thiên Chúa, anh em được hưởng điều Người đã hứa.
      <i>Đó là Lời Chúa.</i>

<strong>Đáp ca (Tv 30)</strong>
<strong>Đ. Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.</strong>
Xin Ngài nên như núi đá cho con trú ẩn,
như thành trì để cứu độ con.
Vì danh dự Ngài, xin dẫn đường chỉ lối cho con.		    <strong>Đ.</strong>

Trong tay Ngài, con xin phó thác hồn con,
Ngài đã cứu chuộc con, lạy Chúa Trời thành tín.
Phần con đây, lạy Chúa, chỉ tin tưởng nơi Ngài,
được Ngài đoái thương, con vui mừng hớn hở.		    <strong>Đ.</strong>

Xin toả ánh tôn nhan rạng ngời
trên tôi tớ Ngài đây, và lấy tình thương mà cứu độ.
Hỡi mọi người cậy trông vào Chúa,
mạnh bạo lên, can đảm lên nào ! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Lạy Chúa, xin ban cho chúng con Thần Khí sự thật, để Người hướng dẫn chúng con đến chân lý vẹn toàn. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>TIN MỪNG</strong> (Mt 10,17-22)
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Mát-thêu</strong>
      Hãy coi chừng người đời. Họ sẽ nộp anh em cho các hội đường, và sẽ đánh đập anh em trong các hội đường của họ. Và anh em sẽ bị điệu ra trước mặt vua chúa quan quyền vì Thầy để làm chứng cho họ và các dân ngoại được biết. Khi người ta nộp anh em, thì anh em đừng lo phải nói làm sao hay phải nói gì, vì trong giờ đó, Thiên Chúa sẽ cho anh em biết phải nói gì: Thật vậy, không phải chính anh em nói, mà là Thần Khí của Cha anh em nói trong anh em. Anh sẽ nộp em, em sẽ nộp anh cho người ta giết; cha sẽ nộp con, con cái sẽ đứng lên chống lại cha mẹ và làm cho cha mẹ phải chết. Vì danh Thầy, anh em sẽ bị mọi người thù ghét. Nhưng kẻ nào bền chí đến cùng, kẻ ấy sẽ được cứu thoát.
      <i>Đó là Lời Chúa</i>

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin Chúa chúc lành thánh hóa của lễ chúng con dâng: nhờ của lễ này, xin Chúa ban cho chúng con tình yêu nhiệt thành, đã đem lại cho chân phước Ghê-brê Mi-ca-e sức mạnh, để chịu đau khổ đến cùng vì Chúa. 
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc
thật là chính đáng và phải đạo.
Chúng con nhận ra dấu chỉ huy hoàng ân phúc của Cha
trong cuộc tử đạo của chân phước Ghê-brê Mi-ca-e;
Khi hiến mình như Đức Kitô,
chân phước đã tôn vinh danh Cha.
Chính quyền năng Cha tỏ hiện trong sự yếu đuối,
khi Cha ban cho các thụ tạo mỏng dòn được tạ ơn Cha,
nhờ Đức Kitô, Chúa chúng con.
Vì vậy cùng các thiên thần trên trời, chúng con dưới trần gian
chúc tụng thờ lạy Cha và tung hô rằng :  

<strong>Ca hiệp lễ</strong>
Chúa phán cùng chúng ta: “Ai đành mất mạng sống mình vì Ta và vì Tin Mừng thì sẽ cứu được mạng sống mình”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Chúa, xin cho việc hiệp lễ này ban sức mạnh cho tâm hồn chúng con, sức mạnh đã làm cho chân phước Ghê-brê Mi-ca-e, trung thành phục vụ Chúa và chiến thắng trong khổ hình. 
Chúng con cầu xin...
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

 // 20 Các Chân Phước Lu-i Giu-se Phan-xi-cô, Gio-an Hen-ri Gruy-ê, Gio-an Chác-lê Ca-ron, Ni-cô-la Cô-lanh và Phê-rô Rơ-nê Rô-ghê
  {
    id: 'st-louis-joseph-francois-jean-henri-guyer-jean-charles-caron-nicholas-colin-pierre-rene-rogue',
    date: '09-02',
    title: { 
      vi: 'Các Chân phước Lu-i Giu-se Phan-xi-cô, Gio-an Hen-ri Gruy-ê, Gio-an Chác-lê Ca-ron, Ni-cô-la Cô-lanh và Phê-rô Rơ-nê Rô-ghê',
      en: 'Bl. Louis-Joseph François, Jean-Henri Gruyer, Jean Charles Caron, Nicholas Colin and Pierre René Rogue',
     
    },
    subtitle: {
      vi: 'Tu Hội Truyền Giáo - Mục tử, Tử đạo',
      en: 'Congregation of the Mission - Shepherd, Martyr',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

   // 21 Chân phước Phê-đê-rích Ô-za-nam
  {
    id: 'bl-frederic-ozanam',
    date: '09-09',
    title: { 
      vi: 'Chân phước Phê-đê-rích Ô-za-nam',
      en: 'Bl. Frédéric Ozanam',
     
    },
    subtitle: {
      vi: 'Giáo Dân sáng lập Hiệp Hội Bác Ái Thánh Vinh Sơn Phaolô',
      en: 'Lay Founder of the Society of Saint Vincent de Paul',
      
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
 vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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
   // 22 Thánh Gio-an Ga-bri-en Pec-boa
  {
    id: 'st-jean-gabriel-perboyre',
    date: '09-11',
    title: { 
      vi: 'Thánh Gio-an Ga-bri-en Pec-boa',
      en: 'St. Jean Gabriel Perboyre',
     
    },
    subtitle: {
      vi: 'Tu Hội Truyền Giáo - Mục tử - Tử đạo',
      en: 'Congregation of the Mission - Shepherd - Martyr',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

    // 23 Thánh Vinh Sơn Phaolô
  {
    id: 'st-vincent-de-paul',
    date: '09-27',
    title: { 
      vi: 'Thánh Vinh Sơn Phaolô',
      en: 'St. Vincent de Paul',
     
    },
    subtitle: {
      vi: 'Đấng sáng lập Tu Hội Truyền Giáo và Tu Hội Nữ Tử Bác Ái',
      en: 'Founder of the Congregation of the Mission and the Daughters of Charity',
      
    },
    type: 'Đại lễ',
    sections: {
      biography: {
        vi: `<strong>Tiểu sử</strong>

        `,
       
en: `<strong>Biography</strong>
Born in Pouy, Gascony, on the 24th of April 1581, Vincent De Paul was ordained a priest on the 23rd of September 1600 in Château-l’Évêque. Initially, he was a parish priest in Paris, later becoming a chaplain to the Gondi family. He dedicated himself entirely to helping the poor and for this purpose, he founded the Confraternity of Charity among the laity, and later in 1625, the Congregation of the Mission, to which he entrusted the missions to the people and the task of training the clergy. Furthermore, with the collaboration of Saint Louise de Marillac, he founded the Company of the Daughters of Charity. He died in Paris on the 27th of September 1660. He was beatified on the 13th of August 1729 and was canonized on the 16th of June 1737. Leo XIII proclaimed him the patron of all charitable works.  
`
},
      massReadings: {
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

     // 24 Chân phước Con-tác-đô Phê-ri-ni
  {
    id: 'bl-cntardo-ferrini',
    date: '10-17',
    title: { 
      vi: 'Chân phước Con-tác-đô Phê-ri-ni',
      en: 'Bl. Contardo Ferrini'
    },
    subtitle: {
      vi: 'Giáo dân',
      en: 'Layperson',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

     // 25 Chân phước Pho-tu-na-tô Vê-lát-cô Tô-ba, linh mục Men-ki-o-ra A-đô-ra-ti-ôn Cóc-tê Bu-ê-nô, Giô-sép-pha Mác-ti-nê Pê-rê, trinh nữ và các bạn tử đạo
  {
    id: 'bl-fortunato-velasco-tobar-melchiora-adoration-cortes-bueno-josepha-martinez-perez',
    date: '11-06',
    title: { 
      vi: 'Chân phước Pho-tu-na-tô Vê-lát-cô Tô-ba, linh mục Men-ki-o-ra A-đô-ra-ti-ôn Cóc-tê Bu-ê-nô, Giô-sép-pha Mác-ti-nê Pê-rê, trinh nữ và các bạn tử đạo',
      en: 'Bl. Fortunato Velasco Tobar, Priest, Melchiora Adoration Cortés Bueno, Josepha Martínez Pérez, Virgins, and Companions, Martyr'
    },
    subtitle: {
      vi: 'Chân phước Pho-tu-na-tô Vê-lát-cô Tô-ba, linh mục Men-ki-o-ra A-đô-ra-ti-ôn Cóc-tê Bu-ê-nô, Giô-sép-pha Mác-ti-nê Pê-rê, trinh nữ và các bạn tử đạo',
      en: 'Bl. Fortunato Velasco Tobar, Priest, Melchiora Adoration Cortés Bueno, Josepha Martínez Pérez, Virgins, and Companions, Martyr',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

       // 26 Thánh nữ A-gót-ti-na Pi-ê-tran-tô-ni
  {
    id: 'st-agostina-pietrantoni',
    date: '11-13',
    title: { 
      vi: 'Thánh nữ A-gót-ti-na Pi-ê-tran-tô-ni',
      en: 'St. Agostina Pietrantoni'
    },
    subtitle: {
      vi: 'Đồng trinh, Tử đạo',
      en: 'Virgin, Martyr',
      
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
  vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

       // 27 Chân phước En-rích-sơ-ta An-phi-ê-ri
  {
    id: 'bl-enrichetta-alfieri',
    date: '11-23',
    title: { 
      vi: 'Chân phước En-rích-sơ-ta An-phi-ê-ri',
      en: 'Bl. Enrichetta Alfieri'
    },
    subtitle: {
      vi: 'Trinh nữ',
      en: 'Virgin',
      
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
 vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

    // 28 Lễ Đức Mẹ Ban Ảnh Làm Phép Lạ
  {
    id: 'the-miraculous-image-of-our-lady',
    date: '11-27',
    title: { 
      vi: 'Lễ Đức Mẹ Ban Ảnh Làm Phép Lạ',
      en: 'The Miraculous Image of Our Lady'
    },
    subtitle: {
      vi: 'Đức Mẹ Ban Ơn',
      en: 'Our Lady of Graces',
      
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
 vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

    // 29 Thánh nữ Ca-ta-ri-na La-bu-rê
  {
    id: 'st-catherine-laboure',
    date: '11-28',
    title: { 
      vi: 'Thánh nữ Ca-ta-ri-na La-bu-rê',
      en: 'St. Catherine Labouré'
    },
    subtitle: {
      vi: 'Nữ Tử Bác Ái',
      en: 'Daughter of Charity',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

     // 30 Chân phước Mác-cô An-tôn Đu-ran-đô
  {
    id: 'bl-marc-antoine-durando',
    date: '12-10',
    title: { 
      vi: 'Chân phước Mác-cô An-tôn Đu-ran-đô',
      en: 'Bl. Marc Antoine Durando'
    },
    subtitle: {
      vi: 'Linh mục',
      en: 'Priest',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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

       // 31 Chân phước Giu-li-a Nê-mê-si-a Va-lê
  {
    id: 'bl-giulia-nemesia-valle',
    date: '12-12',
    title: { 
      vi: 'Chân phước Giu-li-a Nê-mê-si-a Va-lê',
      en: 'Bl. Giulia Nemesia Valle'
    },
    subtitle: {
      vi: 'Trinh nữ',
      en: 'Virgin',
      
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
vi: `

<strong>Ca nhập lễ (Gr 17, 7 - 8)</strong>
Phúc thay kẻ đặt niềm tin vào Đức Chúa, và có Đức Chúa làm chỗ nương thân. Người ấy như cây trồng bên dòng nước, và không ngừng trổ sinh hoa trái.

<strong>Lời nguyện nhập lễ</strong>
Lạy Chúa, thánh nữ Ê-li-za-bét An-na Xe-tôn đã tha thiết ao ước tìm thấy Chúa, nên Chúa đã ban cho thánh nữ Ánh Sáng rực rỡ của Chúa. Xin ban cho chúng con, theo gương người để lại, biết đáp trả tiếng gọi của Tin Mừng, và kiên vững trong đức tin, nhiệt thành trong đức mến. 
Chúng con cầu xin...

<strong>Bài đọc (Gr 20, 7,8b-9)</strong>
<em>(Để đáp trả tiếng gọi của Thiên Chúa, Ê-li-za-bét An-na Xe-tôn đã phải chiến đấu chống lại gia đình mình và chống lại những cám dỗ của riêng mình).</em>
<strong>Bài trích sách Ngôn sứ Giêrêmia</strong>
Lạy Đức Chúa Ngài đã quyến rũ con, và con đã để cho Ngài quyến rũ. Ngài mạnh hơn con, và Ngài đã thắng. Suốt ngày con đã nên trò cười cho thiên hạ, để họ nhạo báng con. Vì Lời Đức Chúa mà con đây bị sỉ nhục và chế giễu suốt ngày. Có lần con tự nhủ: “Tôi sẽ không nghĩ đến Người, cũng chẳng nhân danh Người mà nói nữa”. Nhưng Lời Ngài cứ như ngọn lửa bừng cháy trong tim, âm ỉ trong xương cốt. Con nén chịu đến phải hao mòn, nhưng làm sao nén được!
Đó là lời Chúa.  

<strong>Đáp ca (Tv 15)</strong>
<strong>Đ. Lạy Chúa, Chúa là nguồn hạnh phúc và niềm vui của con!</strong>
Lạy Chúa Trời xin giữ gìn con,
vì bên Ngài con đang ẩn náu.
Con thưa cùng Chúa: “Ngài là Chúa con thờ,
ngoài Chúa ra đâu là hạnh phúc”.		    <strong>Đ.</strong>

Con chúc tụng Chúa hằng thương chỉ dạy,
ngay cả đêm trường, lòng dạ nhắn nhủ con
Con luôn nhớ có Ngài trước mặt,
được Ngài ở bên chẳng nao núng bao giờ.		    <strong>Đ.</strong>


Chúa sẽ dạy con biết đường về cõi sống:*
trước Thánh Nhan ôi vui sướng tràn trề,
ở bên Ngài, hoan lạc chẳng hề vơi! 		    <strong>Đ.</strong>  

<strong>Tung hô Tin Mừng (Ga 15,16)</strong>
<strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong> Thầy đã chọn anh em từ giữa thế gian, để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại. <strong>Ha-lê-lu-i-a. Ha-lê-lu-i-a.</strong>

<strong>Tin Mừng (Ga 15, 9 – 17)</strong>
<strong>Tin Mừng Đức Giêsu Kitô theo thánh Gio-an</strong>

Trước khi bỏ thế gian về với Chúa Cha, Đức Giêsu nói với các môn đệ: “Chúa Cha đã yêu mến Thầy thế nào, Thầy cũng yêu mến anh em như vậy. Anh em hãy ở lại trong tình thương của Thầy. Nếu anh em giữ các điều răn của Thầy, anh em sẽ ở lại trong tình thương của Thầy, như Thầy đã giữ các điều răn của Cha Thầy và ở lại trong tình thương của Người. Các điều ấy, Thầy đã nói với anh em để anh em được hưởng niềm vui của Thầy và niềm vui của anh em được nên trọn vẹn.
Đây là điều răn của Thầy: anh em hãy yêu thương nhau như Thầy đã yêu thương anh em. Không có tình thương nào cao cả hơn tình thương của người đã hy sinh tính mạng vì bạn hữu của mình. Anh em là bạn hữu của Thầy, nếu anh em thực hiện những điều Thầy truyền dạy. Thầy không còn gọi anh em là tôi tớ nữa, vì tôi tớ không biết việc chủ làm. Nhưng Thầy gọi anh em là bạn hữu, vì tất cả những gì Thầy nghe được nơi Cha Thầy, Thầy đã cho anh em biết.
Không phải anh em đã chọn Thầy, nhưng chính Thầy đã chọn anh em, và cắt cử anh em để anh em ra đi, sinh được hoa trái, và hoa trái của anh em tồn tại, hầu tất cả những gì anh em xin cùng Chúa Cha nhân danh Thầy, thì Người ban cho anh em. Điều Thầy truyền dạy anh em là “hãy yêu thương nhau”.                  
Đó là lời Chúa.

<strong>Lời nguyện tiến lễ</strong>
Lạy Chúa, xin đón nhận lễ phẩm của dân Chúa. Khi chúng con nhớ lại tình yêu vô biên của Con Chúa, xin cho chúng con, theo gương thánh nữ Ê-li-za-bét An-na, biết yêu mến Chúa và yêu thương tha nhân với một tâm hồn quảng đại hơn.
Chúng con cầu xin...  

<strong>TIỀN TỤNG</strong>
Lạy Cha chí thánh,
là Thiên Chúa toàn năng hằng hữu,
chúng con tạ ơn Cha mọi nơi mọi lúc,
thật là chính đáng, phải đạo
và đem lại ơn cứu độ cho chúng con
nhờ Đức Kitô, Chúa chúng con.
Cha luôn làm sống lại sức mạnh của Giáo Hội Cha
nhờ niềm tin của các thánh,
và như vậy Cha cho chúng con thấy được tình yêu của Cha.
Hôm nay, chúng con tạ ơn Cha,
nhờ gương sáng của các ngài khích lệ,
và nhờ lời chuyển cầu của các ngài trợ giúp,
chúng con hăng say hoạt động để Nước Cha trị đến.
Vì thế, lạy Cha, cùng với toàn thể thiên thần và các thánh,
chúng con chúc tụng vinh quang Cha rằng:  

<strong>Ca hiệp lễ</strong> <i>(Ga 8,12)</i>
Đức Giê-su nói với người Do-thái: 
“Tôi là ánh sáng thế gian. 
Ai theo tôi, sẽ không phải đi trong bóng tối, 
nhưng sẽ nhận được ánh sáng đem lại sự sống”.

<strong>Lời nguyện hiệp lễ</strong>
Lạy Thiên Chúa toàn năng, xin cho Bí tích Thánh Thể này trợ giúp chúng con, để theo gương thánh nữ Ê-li-za-bét An-na, tâm hồn và cả đời sống chúng con biểu lộ tình bác ái huynh đệ và làm tỏa rạng chân lý.
Chúng con cầu xin.
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
        vi: 'Bản quyền thuộc Ban Truyền Thông <br/> Tu Hội Truyền Giáo - Tỉnh dòng Việt nam © 2025',
        en: 'Copyright belongs to the Media Ministry <br/> Congregation of the Mission - Vietnam Province © 2025.' 
    },
    feastTypes: [
        { name: { vi: 'Đại lễ', en: 'Solemnity' } },
        { name: { vi: 'Lễ kính', en: 'Feast' } },
        { name: { vi: 'Lễ nhớ', en: 'Memorial' } },
        { name: { vi: 'Kỷ niệm', en: 'Commemoration' } },
    ],
    mainSectionContents: {
        prayers: [
// Kinh Lạy Cha
           { id: 'laycha', title: { vi: 'Kinh Lạy Cha', en: 'Our Father'}, 
           content: { 
            vi: 'Lạy Cha chúng con ở trên trời, chúng con nguyện danh Cha cả sáng, nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời. Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con như chúng con cũng tha kẻ có nợ chúng con. Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi mọi sự dữ. Amen.', 
            en: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come, Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation,but deliver us from evil. Amen.', 
           }},
// Kinh Kính Mừng
           { id: 'kinhmung', title: { 
            vi: 'Kinh Kính Mừng', 
            en: 'Hail Mary'
          }, 
           content: { 

            vi: 'Kính mừng Maria đầy ơn phước, Đức Chúa Trời ở cùng Bà, Bà có phước lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phước lạ. Thánh Maria Đức Mẹ Chúa Trời, cầu cho chúng con là kẻ có tội, khi này và trong giờ lâm tử. Amen.', 
            en: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
            
          }},
// Kinh Sáng Danh
          { id: 'sangdanh', title: { 
            vi: 'Sáng Danh', 
            en: 'Glory Be', 
           }, 
           content: { 

            vi: 'Sáng danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần. Như đã có trước vô cùng, và bây giờ, và hằng có, và đời đời chẳng cùng. Amen.', 
            en: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.', 
           }},
// Kinh Tin Kính
           { id: 'kinhtinkinh', title: { 
            vi: 'Kinh Tin Kính', 
            en: 'Apostles Creed'
          }, 
           content: { 

            vi: 'Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất. Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha, cùng là Chúa chúng tôi. Bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh, chịu nạn đời quan Phongxiô Philatô, chịu đóng đanh trên cây Thánh giá, chết và táng xác, xuống ngục tổ tông, ngày thứ ba bởi trong kẻ chết mà sống lại, lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng. Ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết. Tôi tin kính Đức Chúa Thánh Thần. Tôi tin có Hội Thánh hằng có ở khắp thế này, các Thánh thông công. Tôi tin phép tha tội. Tôi tin xác loài người ngày sau sống lại. Tôi tin hằng sống vậy. Amen.', 
            en: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.', 
          }},
          // Kinh Lạy Nữ Vương
           { id: 'kinhlaynuvuong', title: { 
            vi: 'Kinh Lạy Nữ Vương', 
            en: 'Hail Holy Queen'
          }, 
           content: { 

            vi: 'Lạy Nữ Vương, Mẹ nhân lành, làm cho chúng con được sống, được vui, được cậy. Thân lạy Mẹ, chúng con, con cháu Evà ở chốn khách đầy, kêu đến cùng Bà. Chúng con ở nơi khóc lóc, than thở, kêu khẩn Bà thương. Hỡi ôi! Bà là Nữ Bào Chữa chúng con, xin ghé mắt thương xem chúng con. Đến sau khỏi đày, xin cho chúng con được thấy Đức Chúa Giêsu, Con lòng Bà gồm phước lạ. Ôi khoan thay! Nhân thay! Dịu thay! Thánh Maria trọn đời đồng trinh. Amen.', 
            en: 'Hail, holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.', 
            }},
// Kinh dâng ngày
           { id: 'kinhdangngay', title: { 
            vi: 'Kinh dâng ngày', 
            en: 'Daily Offering'
          
          }, 
           content: { 
            vi: 'Lạy Chúa là Thiên Chúa Toàn Năng, Chúa đã cho chúng con sống đến sáng hôm nay; họp nhau trước nhan Chúa, trong Thánh Danh Chúa và hiệp cùng tất cả anh chị em chúng con, chúng con dâng lên Chúa ngày hôm nay, cùng mọi việc làm, mọi chiến đấu, đau khổ và vui mừng của chúng con và của toàn thể gia đình nhân loại. Xin cho kinh nguyện, tư tưởng, lời nói và việc làm của chúng con, nhờ ơn Chúa giúp, được sạch mọi tội lỗi và đẹp lòng Chúa. Xin Chúa khấng ban những ơn ích bởi những việc lành chúng con sẽ làm trong ngày hôm nay, để chỉ cho Hội Thánh, cho Tu Hội, cho gia đình của chúng con, và cho tất cả những người chúng con muốn cầu nguyện. Chớ gì trọn đời sống chúng con, nhất là ngày hôm nay, nhờ Đức Giêsu Kitô Chúa chúng con, và Mẹ Thánh Người, được sáng Danh Chúa và cộng tác vào phần rỗi thế gian. Amen.', 
            en: 'Eternal Father, I offer you everything I do this day. I offer you my prayers, thoughts, words, joys and sufferings / in union with the Eucharistic sacrifice of your Son Jesus Christ. May the Holy Spirit who guided and empowered Jesus be my guide and strength / so that I can be a witness to your love. I pray that all those who are baptized may mature in their faith / and manifest it through clear, coherent and courageous choices in life. I also pray that the evangelization of the poor of our Congregation of the Mission / may everywhere increase the spirit of missionary animation and cooperation. Amen'
          }},
// Kinh Thánh Vinh Sơn
            { id: 'kinhthanhvinhson', title: { 
            vi: 'Kinh Thánh Vinh Sơn', 
            en: 'Official prayer of the society of St. Vincent de Paul'
          
          }, 
           content: { 
            vi: 'Lạy Chúa, để người nghèo được cứu độ và để hàng giáo sĩ được đào tạo tốt đẹp, Chúa đã đổ muôn ơn tông đồ xuống trên tôi tớ Chúa là Thánh Vinh Sơn Phaolô; chúng con là những người đang muốn học hỏi cuộc sống của thánh nhân. Vậy xin Chúa hằng ban cho chúng con được cháy lửa tình yêu của người, để chúng con biết yêu những gì người đã yêu mến và thực hành những gì người đã truyền dạy. Chúa là Đấng hằng sống và hiển trị muôn đời. Amen.', 
            en: 'Lord Jesus, You who willed to become poor, give us eyes and a heart directed toward the poor; help us to recognize you in them, in their thirst, their hunger, their loneliness, and their misfortune. Enkindle within our Vincentian Family unity, simplicity, humility, and the fire of love that burned in St. Vincent de Paul. Strengthen us, so that, faithful to the practice of these virtues,/ we may contemplate you and serve you in the person of the poor, and may one day be united with you and them in your Kingdom. Amen'
          }},

// Kinh kết thúc nguyện gẫm
            { id: 'kinhketthucnguyengam', title: { 
            vi: 'Kinh kết thúc nguyện gẫm', 
            en: 'Prayer after meditation'
          
          }, 
           content: { 
            vi: 'Lạy Chúa, con xin chúc tụng Chúa đã đến hiện diện và ban ơn cho con trong giờ nguyện gẫm này. Nếu con đã không hưởng dùng ơn ấy cho đúng mức, thì xin Chúa tha thứ cho con. Xin Chúa củng cố những điều con vừa dốc lòng và ban sức mạnh giúp con thực thi trong đời sống, để chứng tỏ con yêu mến Chúa hơn, và phụng sự Chúa đắc lực hơn, qua những người anh em khốn khổ của chúng con. Amen.', 
            en: 'I adore you, O my God, and love with all my heart. I thank you for having created me, called me into the Congregation of the Mission, and preserved me during the night past. I offer you all my actions of this day; grant that they may be done according to your holy will and for your greater glory. Keep me from sin and from every evil. May your grace be always with me and with all those who are dear to me. Amen.'
          }},

// Kinh cầu cho ơn Thiên Triệu
  { id: 'kinhcauchoonthientrieu', title: { 
            vi: 'Kinh cầu cho ơn Thiên Triệu', 
            en: 'Vincentian prayer for vocation'
          
          }, 
           content: { 
            vi: 'Lạy Chúa là Đấng Israel trông đợi, là Đấng cứu dân trong thời nguy khốn, xin từ trời cao ghé mắt nhân từ nhìn xuống, đến thăm vườn nho này, lấy nước đổ tràn mương cho đâm trồi nảy lộc, xin cho trở nên muôn phần tốt tươi. Mảnh vườn chính bàn tay phải Chúa đã vun trồng, mùa màng thật bát ngát mà thợ gặt thì ít. Vậy chúng con nài xin Chúa là chủ mùa màng hãy sai thợ gặt đến; xin làm cho dân Chúa trở nên đông số, làm cho mọi người vui thỏa, để xây tường lũy Giêrusalem. Nhà đây là nhà của Chúa, chúng con nài xin Chúa, đừng để viên đá nào, không phải do bàn tay rất thánh đặt để, còn những kẻ Chúa đã gọi, thì xin gìn giữ họ, làm cho họ nên thánh trong sự thật. Amen.', 
            en: 'O hope of Israel! Our savior in times of trouble look down from heaven and visit this vineyard fill its streams, multiply its fruits and perfect what your right hand has planted. The harvest is indeed great but the laborers are scarce we ask you, O Lord of the harvest to send laborers into Your Harvest multiply Your family and increase its joys so that the walls of Jerusalem May be built up This is your house, O Lord, This is your house Let there not be in it we beseech you A stone which you Yourself have not places Preserve in Your name Those you have already called and sanctify them in truth. Amen.'
          }},
  // Kinh cho kỷ niệm 400 năm thành lập Tu Hội Truyền Giáo
  { id: 'kinhnamthanh400', title: { 
            vi: 'Kinh năm thánh nhân bốn thế kỷ thành lập Tu Hội Truyền Giáo', 
            en: 'Prayer for the 400th of the foundation of the Congregation of the Mission'
          
          }, 
           content: { 
            vi: 'Lạy Chúa giàu lòng thương xót, chúng con ngợi khen và tôn vinh Chúa, Đấng luôn đồng hành với từng bước chân qua những nẻo đường lịch sử chúng con. Chúng con cảm tạ Chúa đã chọn Cha Thánh Vinh Sơn Phaolô và vì Giáo Hội, Chúa đã biến đổi ngài thành một ngôn sứ của lòng bác ái và công bình. Chúa đã gọi ngài trở nên hình ảnh của Đức Kitô, Mục Tử Nhân Lành, Đấng chăm sóc những người bé nhỏ và yếu đuối, những kẻ lạc lối và bị loại trừ. Chính Thần khí sự thật và ánh sáng của Chúa, đã thối bùng trái tim ngài bằng một tình yêu lớn lao. Qua ngài, Chúa đã nâng đỡ Tu Hội nhỏ bé trong bốn thế kỷ qua, và luôn diễn tả sự bao bọc của Chúa với những người nghèo khổ trên Trái Đất này. Xin cho chúng con trở thành con người cầu nguyện, được nuôi dưỡng bằng Thánh Thể Chúa, ngự trên đôi tay chúng con, được nuôi dưỡng bằng Lời Chúa, ủy thác trên môi miệng chúng con. Để chúng con có khả năng cảm thông trước những khổ đau của nhân loại. Xin đốt lên trong tâm hồn chúng con ngọn lửa của lòng nhân hậu và ngọn lửa truyền giáo. Xin cho chúng con đừng bao giờ quên rằng mọi sự đều là ân huệ Chúa ban. Amen.', 
            en: 'Praise and honor to you, God of mercy, who always accompany our steps along the paths of history. We thank you because you have chosen Vincent de Paul and, for your Church, you converted him into a prophet of charity and justice. You called him to be an icon of Christ, the Good Shepherd, who cares for the least and the fragile, the lost and the excluded. Your Spirit of truth and light, inflamed his heart with a great love. Through him you raised up the Little Company, wich, for four centuries, tells of your solidarity with the poor of the Earth. Make us today men of prayer, capable of his regard for human miseries, nourished by the Eucharist you place in our hands and by the Gospel you entrust to our lips. Let there burn in our hearts the fire of tenderness and mission. Make us never lose the memory that everything is your gift. Amen'
          }},
          
// Da Pacem
{ id: 'dapacem', title: { 
            vi: 'Da Pacem', 
            en: 'Da Pacem'
          
          }, 
           content: { 
            vi: 'Da Pacem Domine, in diebus nostris. Quia non est alius qui pugnet pro nobis, Nisi tu, Deus noster.', 
            en: 'Da Pacem Domine, in diebus nostris. Quia non est alius qui pugnet pro nobis, Nisi tu, Deus noster.'
          }},

// Kinh Kinh Truyền Tin
           { id: 'kinktruyentin', title: { 
            vi: 'Kinh Truyền Tin', 
            en: 'The Angelus'
          
          }, 
           content: { 
            vi: `
<strong>Xướng:</strong> Đức Chúa Trời sai Thánh Thiên Thần truyền tin cho Rất Thánh Đức Bà Maria.
<strong>Đáp:</strong> Và Rất Thánh Đức Bà chịu thai bởi phép Đức Chúa Thánh Thần.
<i>Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà, Bà có phúc lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phúc lạ. 
Thánh Maria Đức Mẹ Chúa Trời, cầu cho chúng con là kẻ có tội khi nay và trong giờ lâm tử. Amen.</i>
<strong>Xướng:</strong> Này tôi là tôi tá Đức Chúa Trời.
<strong>Đáp:</strong> Tôi xin vâng như lời Thánh Thiên Thần truyền.
<i>Kính mừng... Thánh Maria...</i>
<strong>Xướng:</strong> Chốc ấy Ngôi Thứ Hai xuống thế làm người.
<strong>Đáp:</strong> Và ở cùng chúng con.
<i>Kính mừng... Thánh Maria...</i>
<strong>Xướng:</strong> Lạy Rất Thánh Đức Mẹ Chúa Trời, xin cầu cho chúng
<strong>Đáp:</strong> Đáng chịu lấy những sự Chúa Kitô đã hứa.
<strong>Lời nguyện:</strong> Lạy Chúa, chúng con xin Chúa ban ơn xuống trong linh hồn chúng con là kẻ đã nhờ lời Thánh Thiên Thần truyền, mà biết thật Chúa Kitô là con Chúa đã xuống thế làm Người, thì xin vì công ơn Chúa chịu nạn chịu chết trên cây Thánh Giá, cho chúng con ngày sau khi sống lại được đến nơi vinh hiển, cũng vì công nghiệp Chúa Kitô Chúa chúng con. Amen.

            `, 
 en: `
<strong>V:</strong> The Angel of the Lord declared unto Mary,
<strong>R:</strong> And she conceived of the Holy Spirit.
<i>Hail Mary, full of grace, the Lord is with thee; blessed art thou among women and blessed is the fruit of thy womb, Jesus. 
Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.</i>
<strong>V:</strong> Behold the handmaid of the Lord.
<strong>R:</strong> Be it done unto me according to Your Word.
<i>Hail Mary... Holy Mary...</i>
<strong>V:</strong> And the Word was made flesh,
<strong>R:</strong> And dwelt among us.
<i>Hail Mary... Holy Mary...</i>
<strong>V:</strong> Pray for us, O holy Mother of God.
<strong>R:</strong> That we may be made worthy of the promises of Christ.
<strong>Let us pray:</strong> Pour forth, we beseech You, O Lord, Your Grace into our hearts; that as we have known the incarnation of Christ, your Son by the message of an angel, so by His passion and cross we may be brought to the glory of His Resurrection. Through the same Christ, our Lord. Amen.
            `,
          }},


        ],
// Kinh tối 
        prayersoffice: [
// Chúa Nhật
            { id: 'chunhat', title: { 
              vi: 'Chúa Nhật',
              en: 'Sunday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
<strong>CA VỊNH</strong>
              <i><strong>Tv 87 (88)</strong></i>
<strong><i>Lời cầu xin trong lúc ngặt nghèo</i></strong>
<i>Đây là giờ các ông hành động, là lúc thần tăm tối hoành hành (Lc 22,53)</i>

    <strong>ĐC</strong> Trước Thánh Nhan, lạy Chúa,
    con kêu cứu đêm ngày.

    Lạy Chúa là Thiên Chúa cứu độ con,
    trước Thánh Nhan, đêm ngày con kêu cứu. *
    Nguyện cho lời kinh vọng tới Ngài
    xin lắng nghe tiếng lòng thổn thức.
              
    Con nằm đây giữa bao người chết, *
    như các tử thi vùi trong mồ mả
    đã bị Chúa quên đi
    và không được tay Ngài săn sóc.

    Chúa hạ con xuống tận đáy huyệt sâu,
    giữa chốn tối tăm, giữa lòng vực thẳm. *
    Cơn giận Chúa đè nặng thân con
    như sóng cồn xô đẩy dập vùi.

    Chúa làm cho bạn bè xa lánh
    và coi con như đồ ghê tởm. *
    Con bị giam cầm không thể thoát ra,
    mắt mờ đi vì quá nhiều đau khổ.

    Lạy Chúa, suốt cả ngày con kêu lên Chúa
    và giơ tay hướng thẳng về Ngài. *
    Chúa đâu làm phép lạ
    cho người đã mạng vong,
    âm hồn đâu trỗi dậy
    ca tụng Chúa bao giờ ?

    Trong mồ mả, ai nói về tình thương của Chúa,
    cõi âm ty, ai kể lại lòng thành tín của Ngài ? *
    Những kỳ công Chúa, nơi tối tăm ai rõ,
    đức công chính Ngài, chốn quên lãng ai hay ?

    Phần con đây, con kêu lên Ngài, lạy Chúa,
    mới tinh sương đã chờ chực nguyện xin. *
    Lạy Chúa, thân con đây Chúa nỡ nào ruồng rẫy,
    ẩn mặt đi mà chẳng đoái hoài.

    Từ thuở bé, con khổ đã nhiều và luôn ngắc ngoải,
    Chúa làm con kinh hãi, con hoá ra thẫn thờ. *
    Bao cơn thịnh nộ, Ngài đổ ngập thân con,
    bấy nỗi kinh hoàng khiến con rời rã.

    Bủa vây con suốt ngày ngần ấy thứ,
    dồn dập tư bề như nước bao la. *
    Cận thân Chúa khiến lìa xa,
    chung quanh bầu bạn chỉ là bóng đêm.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Trước Thánh Nhan, lạy Chúa,
    con kêu cứu đêm ngày.
              
<strong>Lời Chúa</strong>           <i>(Gr 14,9)</i>
Lạy Chúa, Ngài ngự giữa chúng con, và chúng con thuộc về Chúa vì được mang danh Ngài. Xin đừng bỏ rơi chúng con, lạy Chúa là Thiên Chúa chúng con.
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Thiên Chúa toàn năng, xin cho chúng con được liên kết vững bền với Đức Ki-tô, Con Một Chúa, Đấng đã chịu mai táng trong mồ, để cùng Người, chúng con được trỗi dậy và sống một đời sống mới. Người hằng sống và hiển trị muôn đời.

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   O Christ, you are the light and day
    which drives away the night,
    The ever shining Sun of God
    and pledge of future light.
    
    As now the evening shadows fall
    please grand us, Lord, we pray,
    a quiet night to rest in you
    until the break of day

    Remember us, poor mortal men,
    we humbly ask, O Lord,
    and may your presence in our souls,
    be now our great reward.
  
<strong>2</strong>   Lord Jesus Christ, abide with us,
    now that the sun has run its course;
    let hope not be obscured by night,
    but may faith's darkness be as light.

    Lord Jesus Christ, grant us your peace,
    and when the trials of earth shall cease;
    grant us the morning light of grace,
    the radiant splendor of your face.

    Immortal, Holy Threefold Light,
    Yours be the kingdom, power, and might,
    all glory be eternally
    to you, life giving Trinity!
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,            
     }},
// Thứ Hai
             { id: 'thuhai', title: { 
              vi: 'Thứ Hai',
              en: 'Monday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
 <strong>CA VỊNH</strong>
              <i><strong>Tv 85 (86)</strong></i>
<strong><i>Người khó nghèo cầu nguyện trong cơn quẫn bách</i></strong>
<i>Chúc tụng Thiên Chúa, Đấng luôn nâng đỡ ủi an chúng ta trong mọi cơn thử thách (2 Cr 1,3.4)</i>

    <strong>ĐC</strong> Phần Ngài, muôn lạy Chúa, Ngài chậm giận, lại giàu tình thương và lòng thành tín.

    Lạy Chúa, xin lắng tai và đáp lời con,
    vì thân con nghèo hèn túng quẫn.

    Xin Chúa bảo toàn sinh mạng con,
    bởi vì con trung hiếu. *
    Xin cứu độ tôi tớ Ngài đây,
    hằng tin tưởng nơi Ngài.

    Chính Ngài là Thiên Chúa của con,
    xin rủ lòng thương con, lạy Chúa : *
    con kêu con gọi Chúa suốt ngày.

    Lạy Chúa, xin làm cho con được vui thoả,
    vì con nâng tâm hồn lên tới Chúa.

    Lạy Chúa, Ngài nhân hậu khoan hồng,
    giàu tình thương với mọi kẻ kêu xin ; *
    lạy Chúa, xin lắng nghe lời con cầu khẩn,
    tiếng con van nài, xin để ý lưu tâm.

    Lâm cảnh ngặt nghèo, con kêu lên Chúa,
    vì Chúa vẫn đáp lời. *
    Không một thần linh sánh kịp Ngài, lạy Chúa,
    việc Ngài làm, quả thật vô song.

    Lạy Chúa, muôn dân chính tay Ngài tạo dựng
    sẽ về phủ phục trước Thánh Nhan
    và tôn vinh danh Ngài.

    Vì Ngài thật cao cả
    và làm nên những việc lạ lùng ; *
    chỉ một mình Ngài là Thiên Chúa.

    Xin dạy con đường lối Ngài, lạy Chúa,
    để con vững bước theo chân lý của Ngài. *
    Xin Chúa hướng lòng con,
    để con biết một niềm kính tôn Danh Thánh.

    Lạy Chúa là Thiên Chúa con thờ,
    con hết lòng cảm tạ,
    thánh danh Ngài, con mãi mãi tôn vinh, *
    vì tình Chúa thương con như trời như biển,
    Ngài đã kéo con ra khỏi vực thẳm âm ty.

    Lạy Thiên Chúa, phường kiêu ngạo nổi lên chống đối,
    bè lũ hung tàn tìm hại mạng sống con : *
    chúng đâu có kể chi đến Ngài.

    Phần Ngài, muôn lạy Chúa,
    Ngài là Thiên Chúa nhân hậu từ bi, *
    Ngài chậm giận,
    lại giàu tình thương và lòng thành tín.

    Xin đoái nhìn và xót thương con, *
    ban sức mạnh của Ngài và xuống ơn cứu độ
    cho tôi tớ Ngài đây, con của nữ tỳ Ngài.

    Xin ban cho con một điềm báo phúc,
    để bọn thù ghét con trông thấy mà hổ thẹn, *
    vì, lạy Chúa, chính Ngài giúp đỡ ủi an con.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Phần Ngài, muôn lạy Chúa, Ngài chậm giận, lại giàu tình thương và lòng thành tín.

              
<strong>Lời Chúa</strong>           <i>(1 Tx 5,9-10)</i>
Thiên Chúa đã không định cho chúng ta phải chịu cơn thịnh nộ, nhưng được hưởng ơn cứu độ, nhờ Đức Giê-su Ki-tô, Chúa chúng ta, Đấng đã chết vì chúng ta, để dầu thức hay ngủ, chúng ta cũng sống với Người.
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Chúa, ngày hôm nay chúng con đã khó nhọc gieo hạt giống Nước Trời, giờ đây, xin cho chúng con được nghỉ ngơi lại sức, và xin cho hạt giống chúng con gieo vãi được nẩy nở và trổ bông chín vàng trong ngày mùa sau hết. Chúng con cầu xin

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   Day is done, but love unfailing
    Dwells ever here;
    Shadows fall, but hope prevailing,
    Calms ev'ry fear.
    Loving Father, none forsaking,
    Take our hearts, of love's own making,
    Watch our sleeping, guard our waking,
    Be always near.

    Dark descends, but light unending
    Shines through our night;
    You are with us, ever lending
    New strength to sight:
    One in love, your truth confessing,
    One in hope of heaven's blessing,
    May we see, in love's possessing,
    Love's endless light!

    Eyes will close, but you, unsleeping,
    Watch by our side;
    Death may come, in love's safekeeping
    Still we abide.
    God of love, all evil quelling,
    Sin forgiving, fear dispelling,
    Stay with us, our hearts indwelling,
    This eventide.      
  
<strong>2</strong>   O Christ, you are the light and day
    which drives away the night,
    The ever shining Sun of God
    and pledge of future light.
    
    As now the evening shadows fall
    please grand us, Lord, we pray,
    a quiet night to rest in you
    until the break of day

    Remember us, poor mortal men,
    we humbly ask, O Lord,
    and may your presence in our souls,
    be now our great reward.
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,               }},
// Thứ Ba
 { id: 'thuba', title: { 
              vi: 'Thứ Ba',
              en: 'Tuesday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
<strong>CA VỊNH</strong>
              <i><strong>Tv 142 (143),1-11</strong></i>
<strong><i>Lời cầu xin lúc gặp hiểm nguy</i></strong>
<i>Con người được nên công chính không phải vì làm những việc lề luật dạy, nhưng vì tin vào Đức Ki-tô Giê-su (Gl 2,16)</i>

    <strong>ĐC</strong> Lạy Chúa, xin đừng ẩn mặt đi, vì con vẫn tin cậy nơi Ngài.

    Lạy Chúa, xin nghe lời con khẩn nguyện, *
    lắng nghe con nài van, bởi Ngài thành tín,
    đáp lại lời con, vì Ngài công minh.

    Xin chớ đòi tôi tớ ra xét xử, *
    vì trước thánh nhan Ngài
    chẳng có người nào là công chính.

    Kẻ thù bách hại con,
    chà đạp con dưới đất,
    đẩy vào chốn tối tăm
    như những người đã chết từ bao thuở.

    Hơi thở con chỉ còn thoi thóp,
    nghe con tim giá lạnh trong mình.

    Nhớ ngày xưa tháng cũ,
    con hoài niệm mọi công trình của Chúa,
    và gẫm suy việc tay Chúa làm nên. *
    Hai tay cầu Chúa giơ lên,
    hồn con khát Chúa như miền đất khô.

    Xin mau đáp lời con, lạy Chúa,
    hơi thở con nay đã hầu tàn. *
    Xin đừng ẩn mặt đi,
    kẻo con hoá ra người thiên cổ.

    Ngay từ buổi sớm mai,
    xin cho con nghiệm thấy tình thương của Chúa,
    vì con vẫn tin cậy nơi Ngài. *
    Xin chỉ dạy đường lối phải theo,
    vì con nâng tâm hồn lên cùng Chúa.

    Xin cứu con thoát khỏi địch thù,
    lạy Chúa, bên Ngài con trú ẩn.

    Điều đẹp ý Ngài, xin dạy con thực hiện,
    bởi Ngài là Thiên Chúa của con. *
    Xin thần khí tốt lành của Chúa
    dẫn con đi trên miền đất phẳng phiu.

    Lạy Chúa, vì danh dự của Ngài,
    xin cho con được sống. *
    Bởi vì Ngài công chính,
    xin cứu con khỏi bước ngặt nghèo.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, xin đừng ẩn mặt đi, vì con vẫn tin cậy nơi Ngài.

<strong>Lời Chúa</strong>           <i>1 Pr 5,8-9a</i>
Anh em hãy sống tiết độ và tỉnh thức, vì ma quỷ, thù địch của anh em, như sư tử gầm thét, rảo quanh tìm mồi cắn xé. Anh em hãy đứng vững trong đức tin mà chống cự.
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Chúa, xin thương chiếu giãi ánh sáng Chúa vào bóng tối đêm nay, và ban cho chúng con là con cái Chúa được nghỉ ngơi an lành, để nhân danh Chúa, chúng con được vui mừng thức dậy hưởng ánh quang ngày mới. Chúng con cầu xin

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   O radiant Light, O Sun divine
    of God the Father's deathless face,
    O image of the light sublime
    that fills the heavenly dwelling place.

    Lord Jesus Christ, as daylight fades,
    as shine the lights of eventide,
    we praise the Father with the Son,
    the Spirit blest and with them one.

    O Son of God, the source of life,
    Praise is your due by night and day,
    unsullied lips must raise the strain
    of your proclaimed and splendid name.      
  
<strong>2</strong>    When from the darkness comes no light,
    when from the weeping comes no laughter;
    when in the day we hope for night
    nor any comfort coming after:
    Grant us your peace.

    When in our confidence our fears
    clutch at the heart and make us tremble;
    when in our joy we weep cold tears,
    and in our frankness we dissemble:
    Grant us your light.

    When in our love there is no care.
    And in our yearning we are dullness;
    when what we know we cannot dare,
    we are nothing that is fullness:
    Grand us your truth.
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,               }},

 // Thứ Tư
 { id: 'thutu', title: { 
              vi: 'Thứ Tư',
              en: 'Wednesday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
<strong>CA VỊNH</strong>
              <i><strong>Tv 30 (31),2-6</strong></i>
<strong><i>Lời cầu nguyện tin tưởng của người sầu khổ</i></strong>
<i>Lạy Cha, con xin phó thác hồn con trong tay Cha (Lc 23,46)</i>

    <strong>ĐC</strong> Xin Chúa cứu độ con, và cho con ẩn náu bên Ngài.

    Con ẩn náu bên Ngài, lạy Chúa,
    xin đừng để con phải tủi nhục bao giờ.

    Bởi vì Ngài công chính, xin giải thoát con,
    ghé tai nghe và mau mau cứu chữa. *
    Xin Ngài nên như núi đá cho con trú ẩn,
    như thành trì để cứu độ con.

    Núi đá và thành luỹ bảo vệ con, chính là Chúa,
    vì danh dự Ngài, xin dẫn đường chỉ lối cho con. *
    Lưới kẻ thù giăng, xin gỡ con ra khỏi,
    vì nơi con trú ẩn, chính là Ngài.

    Trong tay Ngài, con xin phó thác hồn con,
    Ngài đã cứu chuộc con, lạy Chúa Trời thành tín.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men

    <strong>ĐC</strong> Xin Chúa cứu độ con, và cho con ẩn náu bên Ngài.

              <i><strong>Tv 129 (130)</strong></i>
<strong><i>Tiếng kêu từ vực thẳm</i></strong>
<i>Chính Đức Giê-su sẽ cứu dân Người khỏi tội lỗi (Mt 1,21)</i>

    <strong>ĐC</strong> Từ vực thẳm, con kêu lên Ngài, lạy Chúa.

    (Từ vực thẳm, con kêu lên Ngài, lạy Chúa,)
    muôn lạy Chúa, xin Ngài nghe tiếng con. *
    Dám xin Ngài lắng tai để ý,
    nghe lời con tha thiết nguyện cầu.

    Ôi lạy Chúa, nếu như Ngài chấp tội,
    nào có ai đứng vững được chăng ? *
    Nhưng Chúa vẫn rộng lòng tha thứ
    để chúng con biết kính sợ Ngài.

    Mong đợi Chúa, tôi hết lòng mong đợi,
    cậy trông ở lời Người. *
    Hồn tôi trông chờ Chúa,
    hơn lính canh mong đợi hừng đông.

    Hơn lính canh mong đợi hừng đông,
    trông cậy Chúa đi, Ít-ra-en hỡi, *
    bởi Chúa luôn từ ái một niềm,
    ơn cứu chuộc nơi Người chan chứa.

    Chính Người sẽ cứu chuộc Ít-ra-en
    cho thoát khỏi tội khiên muôn vàn.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Từ vực thẳm, con kêu lên Ngài, lạy Chúa.
              
<strong>Lời Chúa</strong>           <i>(Ep 4,26-27)</i>
Anh em đừng phạm tội : chớ để mặt trời lặn mà cơn giận vẫn còn. Đừng để ma quỷ thừa cơ lợi dụng !
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Chúa Giê-su Ki-tô khiêm nhường và hiền hậu, ách của Chúa êm ái, gánh của Chúa nhẹ nhàng. Chúng con đến trao vào tay Chúa gánh nặng của ngày hôm nay, xin cho chúng con được nghỉ ngơi bên Chúa là Đấng hằng sống và hiển trị muôn đời.

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   All praise to you, O God, this night,
    for all the blessings of the light;
    keep us, we pray, O King of kings,
    beneath your own almighty wings.

    Forgive us, Lord, through Christ your Son,
    whatever wrong this day we've done;
    your peace give to the world, O Lord,
    that man might live in one accord.

    Enlighten us, O blessed Light,
    and give us rest throughout this night.
    O strengthen us, that for you sake,
    we all may serve you when we wake.   
  
<strong>2</strong>    Lord Jesus Christ, abide with us,
    now that the sun has run its course;
    let hope not be obscured by night,
    but may faith's darkness be as light.

    Lord Jesus Christ, grant us your peace,
    and when the trials of earth shall cease;
    grant us the morning light of grace,
    the radiant splendor of your face.

    Immortal, Holy Threefold Light,
    Yours be the kingdom, power, and might,
    all glory be eternally
    to you, life giving Trinity!
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,               }},
// Thứ Năm
 { id: 'thunam', title: { 
              vi: 'Thứ Năm',
              en: 'Thursday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
<strong>CA VỊNH</strong>
              <i><strong>Tv 15 (16)</strong></i>
<strong><i>Chúa là phần gia nghiệp</i></strong>
<i>Thiên Chúa đã giải thoát Đức Giê-su khỏi những đau khổ do thần chết gây nên mà cho Người sống lại (Cv 2,24)</i>

    <strong>ĐC</strong> TThân xác con nghỉ ngơi an toàn.

    Lạy Chúa Trời, xin giữ gìn con,
    vì bên Ngài, con đang ẩn náu. *
    Con thưa cùng Chúa : “Ngài là Chúa con thờ,
    ngoài Chúa ra, đâu là hạnh phúc ?”

    Còn thần ngoại xứ này,
    những thần linh xưa con sùng mộ, *
    vẫn gia tăng tàn phá,
    và thiên hạ tới tấp chạy theo.

    Máu tế thần, con quyết chẳng dâng,
    tên của thần, môi con không tụng niệm !

    Lạy Chúa, Chúa là phần sản nghiệp con được hưởng,
    là chén phúc lộc dành cho con ; *
    số mạng con, chính Ngài nắm giữ.

    Phần tuyệt hảo may mắn đã về con,
    vâng, gia nghiệp ấy làm con thoả mãn.

    Con chúc tụng Chúa hằng thương chỉ dạy,
    ngay cả đêm trường, lòng dạ nhắn nhủ con. *
    Con luôn nhớ có Ngài trước mặt,
    được Ngài ở bên, chẳng nao núng bao giờ.

    Vì thế, tâm hồn con mừng rỡ
    và lòng dạ hân hoan, *
    thân xác con cũng nghỉ ngơi an toàn.

    Vì Chúa chẳng đành bỏ mặc con trong cõi âm ty,
    không để kẻ hiếu trung này hư nát trong phần mộ.

    Chúa sẽ dạy con biết đường về cõi sống : *
    trước Thánh Nhan, ôi vui sướng tràn trề,
    ở bên Ngài, hoan lạc chẳng hề vơi !

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> TThân xác con nghỉ ngơi an toàn.
              
<strong>Lời Chúa</strong>           <i>(Gr 14,9)</i>
Lạy Chúa, Ngài ngự giữa chúng con, và chúng con thuộc về Chúa vì được mang danh Ngài. Xin đừng bỏ rơi chúng con, lạy Chúa là Thiên Chúa chúng con.
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Chúa là phần gia nghiệp của chúng con, ngoài Chúa ra, chúng con không tìm đâu được hạnh phúc. Xin cho chúng con vững tin rằng : sau khi đã vượt qua đêm dài của cái chết, chúng con sẽ vui mừng sống bên Chúa mãi mãi. Chúng con cầu xin

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   Now at the daylight’s ending
    We turn, O God, to you:
    Send forth your Holy Spirit,
    Our Spirit now renew.

    To you in adoration,
    In thankfulness and praise,
    In faith and hope and gladness,
    Our loving hearts we raise.

    With watchful eyes, O Shepherd,
    Look down upon your sheep;
    Stretch forth your hands in healing
    And close our eyes in sleep.

    Come down, O Holy Spirit,
    To be our loving Guest;
    Be near us, holy angels,
    And guard us as we rest.

    We praise you, heav’nly Father:
    From you all light descends;
    You give us heaven’s glory
    When life’s brief daylight ends.

    We praise you, Jesus, Savior,
    The light of heav’n above;
    We praise you, Holy Spirit,
    The living ﬂame of love.     
  
<strong>2</strong>    O radiant Light, O Sun divine
    of God the Father's deathless face,
    O image of the light sublime
    that fills the heavenly dwelling place.

    Lord Jesus Christ, as daylight fades,
    as shine the lights of eventide,
    we praise the Father with the Son,
    the Spirit blest and with them one.

    O Son of God, the source of life,
    Praise is your due by night and day,
    unsullied lips must raise the strain
    of your proclaimed and splendid name.
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,             }},
// Thứ Sáu
 { id: 'thusau', title: { 
              vi: 'Thứ Sáu',
              en: 'Friday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
<strong>CA VỊNH</strong>
              <i><strong>Tv 87 (88)</strong></i>
<strong><i>Lời cầu xin trong lúc ngặt nghèo</i></strong>
<i>Đây là giờ các ông hành động, là lúc thần tăm tối hoành hành (Lc 22,53)</i>

    <strong>ĐC</strong> Trước Thánh Nhan, lạy Chúa, con kêu cứu đêm ngày.

    Lạy Chúa là Thiên Chúa cứu độ con,
    trước Thánh Nhan, đêm ngày con kêu cứu. *
    Nguyện cho lời kinh vọng tới Ngài
    xin lắng nghe tiếng lòng thổn thức.
              
    Con nằm đây giữa bao người chết, *
    như các tử thi vùi trong mồ mả
    đã bị Chúa quên đi
    và không được tay Ngài săn sóc.

    Chúa hạ con xuống tận đáy huyệt sâu,
    giữa chốn tối tăm, giữa lòng vực thẳm. *
    Cơn giận Chúa đè nặng thân con
    như sóng cồn xô đẩy dập vùi.

    Chúa làm cho bạn bè xa lánh
    và coi con như đồ ghê tởm. *
    Con bị giam cầm không thể thoát ra,
    mắt mờ đi vì quá nhiều đau khổ.

    Lạy Chúa, suốt cả ngày con kêu lên Chúa
    và giơ tay hướng thẳng về Ngài. *
    Chúa đâu làm phép lạ
    cho người đã mạng vong,
    âm hồn đâu trỗi dậy
    ca tụng Chúa bao giờ ?

    Trong mồ mả, ai nói về tình thương của Chúa,
    cõi âm ty, ai kể lại lòng thành tín của Ngài ? *
    Những kỳ công Chúa, nơi tối tăm ai rõ,
    đức công chính Ngài, chốn quên lãng ai hay ?

    Phần con đây, con kêu lên Ngài, lạy Chúa,
    mới tinh sương đã chờ chực nguyện xin. *
    Lạy Chúa, thân con đây Chúa nỡ nào ruồng rẫy,
    ẩn mặt đi mà chẳng đoái hoài.

    Từ thuở bé, con khổ đã nhiều và luôn ngắc ngoải,
    Chúa làm con kinh hãi, con hoá ra thẫn thờ. *
    Bao cơn thịnh nộ, Ngài đổ ngập thân con,
    bấy nỗi kinh hoàng khiến con rời rã.

    Bủa vây con suốt ngày ngần ấy thứ,
    dồn dập tư bề như nước bao la. *
    Cận thân Chúa khiến lìa xa,
    chung quanh bầu bạn chỉ là bóng đêm.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Trước Thánh Nhan, lạy Chúa,
            con kêu cứu đêm ngày.
              
<strong>Lời Chúa</strong>           <i>(Gr 14,9)</i>
Lạy Chúa, Ngài ngự giữa chúng con, và chúng con thuộc về Chúa vì được mang danh Ngài. Xin đừng bỏ rơi chúng con, lạy Chúa là Thiên Chúa chúng con.
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Thiên Chúa toàn năng, xin cho chúng con được liên kết vững bền với Đức Ki-tô, Con Một Chúa, Đấng đã chịu mai táng trong mồ, để cùng Người, chúng con được trỗi dậy và sống một đời sống mới. Người hằng sống và hiển trị muôn đời.

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   Lord Jesus Christ, abide with us,
    now that the sun has run its course;
    let hope not be obscured by night,
    but may faith's darkness be as light.

    Lord Jesus Christ, grant us your peace,
    and when the trials of earth shall cease;
    grant us the morning light of grace,
    the radiant splendor of your face.

    Immortal, Holy Threefold Light,
    Yours be the kingdom, power, and might,
    all glory be eternally
    to you, life giving Trinity!   
  
<strong>2</strong>   When from the darkness comes no light,
    when from the weeping comes no laughter;
    when in the day we hope for night
    nor any comfort coming after:
    Grant us your peace.

    When in our confidence our fears
    clutch at the heart and make us tremble;
    when in our joy we weep cold tears,
    and in our frankness we dissemble:
    Grant us your light.

    When in our love there is no care.
    And in our yearning we are dullness;
    when what we know we cannot dare,
    we are nothing that is fullness:
    Grand us your truth.
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,   
            }},
  // Thứ Bảy
 { id: 'thubay', title: { 
              vi: 'Thứ Bảy',
              en: 'Saturday' 
              }, 
            content: { 
              vi: `
<strong>GIÁO ĐẦU</strong>
<strong>Chủ sự:</strong> Lạy Chúa Trời, xin tới giúp con.
<strong>Cộng đoàn:</strong> Muôn lạy Chúa, xin mau phù trợ.
Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa, 
tự muôn đời và chính hiện nay luôn mãi đến thiên thu vạn đại. <strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(Sau đó, nên thinh lặng giây lát để xét mình. Có thể dùng một công thức thống hối như trong thánh lễ).</i>

<strong>THÁNH THI</strong> <i>(chọn 1 trong 2 thánh thi dưới đây)</i>

<strong>1</strong>   Đêm tối xuống dần trên cõi thế,
    Đoàn con chạy đến Chúa càn khôn, 
    Ngàn muôn ơn thánh xin đổ xuống, 
    Giữ gìn chúng con cả xác hồn. 

    Mơ thấy Chúa Trời : lòng nguyện ước
    Thầm mong cảm nghiệm lúc ngủ ngon, 
    Vầng Đông lấp ló chân trời thẳm
    Sẽ hát mừng Ngài khúc nhặt khoan.
              
    Ban xuống chuỗi ngày đầy sức sống,
    Bồi thêm sinh khí kẻo tàn phai, 
    Chập chờn bóng tối gieo sợ hãi,
    Xin hãy đốt lên lửa sáng ngời. 
              
    Đồng thanh ca tụng Cha hằng hữu,
    Và Thánh Tử Ngài, Đấng Phục Sinh,
    Thần Linh thánh ái, ơn phù trợ,
    Muôn thuở ngàn đời mãi hiển vinh.      
  
<strong>2</strong>   Muôn lạy Chúa Ki-tô Ánh Sáng,
    Bừng lên cho khuất dạng đêm đen,
    Hào quang muôn thuở diệu huyền
    Soi đường tín hữu đi trên cõi đời.

    Cúi xin Đấng tuyệt vời thánh thiện
    Lắng nghe lời khấn nguyện nài van,
    Thương ban giấc ngủ yên hàn,
    Được kề bên Chúa an toàn thong dong.

    Dầu mắt ngủ nhưng lòng vẫn thức,
    Vẫn tin yêu một mực chân tình, 
    Xin giơ tay hữu uy linh 
    Như đồn bảo vệ, như thành chở che.
              
    Cúi xin Đấng phù trì đoái đến, 
    Ngăn chước thù độc hiểm gớm ghê,
    Giữ đoàn con cả đôi bề,
    Máu Ngài tuôn đổ chuộc về thuở xưa.
              
    Chúa Ki-tô là Vua nhân ái, 
    Kính dâng Ngài cùng với Chúa Cha, 
    Hợp cùng Thiên Chúa Ngôi Ba
    Ngàn muôn phước cả vinh hoa đời đời.
              
<strong>CA VỊNH</strong>
              <i><strong>Tv 4</strong></i>
<strong><i>Lời tạ ơn</i></strong>
<i>Thiên Chúa biệt đãi Đức Ki-tô, Đấng Thiên Chúa đã cho sống lại từ cõi chết (thánh Âu-tinh)</i>

    <strong>ĐC</strong> Lạy Chúa, xin thương xót nghe lời con cầu khẩn.

    Lạy Thiên Chúa là đèn trời soi xét,
    khi con kêu, nguyện Chúa đáp lời. *
    Lúc ngặt nghèo, Chúa đã mở lối thoát cho con,
    xin thương xót nghe lời con cầu khẩn.

    Phàm nhân hỡi, cho đến bao giờ
    lòng vẫn còn chai đá *
    ưa thích chuyện hư không,
    chạy theo điều giả dối ?

    Hãy biết rằng :
    Chúa biệt đãi người hiếu trung với Chúa ; *
    khi tôi kêu, Chúa đã nghe lời.

    Hãy run sợ, và đừng phạm tội nữa,
    trên giường nằm, suy nghĩ và lặng thinh. *
    Hãy tiến dâng lễ tế như luật truyền
    và tin tưởng vào Chúa.

    Biết bao kẻ nói rằng :
    “Ai sẽ cho ta thấy hạnh phúc ?” *
    Lạy Chúa, xin toả ánh tôn nhan Ngài trên chúng con.

    Chúa ban xuống lòng con nhiều hoan lạc
    hơn khi thiên hạ được mùa, lúa rượu đầy dư.

    Thư thái bình an, vừa nằm con đã ngủ, *
    vì chỉ có mình Ngài, lạy Chúa,
    ban cho con được sống yên hàn.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, xin thương xót nghe lời con cầu khẩn.

      <i><strong>Tv 133 (134)</strong></i>
<strong><i>Kinh chiều trong đền thánh</i></strong>
<i>Nào ca ngợi Chúa đi, hỡi tất cả tôi trung của Chúa, hỡi những ai lớn nhỏ hằng kính sợ Người (Kh 19,5)</i>

    <strong>ĐC</strong> Hãy chúc tụng Thiên Chúa đêm đêm suốt canh dài.

    Hỡi tất cả những người tôi tớ Chúa
    ứng trực suốt đêm trong thánh điện,
    nào chúc tụng Chúa đi !

    Hãy giơ tay hướng về cung thánh
    mà dâng lên lời chúc tụng Người.

    Cúi xin Đấng tạo thành trời đất
    xuống cho bạn muôn vàn phúc cả
    từ núi thánh Xi-on.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Hãy chúc tụng Thiên Chúa đêm đêm suốt canh dài.

              
<strong>Lời Chúa</strong>           <i>Đnl 6,4-7</i>
Nghe đây, hỡi Ít-ra-en, Đức Chúa, Thiên Chúa chúng ta, là Đức Chúa duy nhất. Hãy yêu mến Đức Chúa, Thiên Chúa của anh em, hết lòng hết dạ, hết sức anh em. Những lời này tôi truyền cho anh em hôm nay, anh em phải ghi lòng tạc dạ. Anh em phải lặp lại những lời ấy cho con cái, phải nói lại cho chúng, lúc ngồi trong nhà cũng như lúc đi đường, khi đi ngủ cũng như khi thức dậy.
<i>(Sau khi nghe lời Chúa, thinh lặng suy niệm trong giây lát).</i>

<strong>Xướng đáp</strong>  
    <strong>X</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.
    <strong>X</strong> Ngài đã cứu chuộc chúng con, lạy Chúa Trời thành tín.
    <strong>Đ</strong> con xin phó thác hồn con.
    <strong>X</strong> Vinh danh Chúa Cha và Chúa Con, cùng vinh danh Thánh Thần Thiên Chúa,
    <strong>Đ</strong> Trong tay Ngài, lạy Chúa, con xin phó thác hồn con.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

    Muôn lạy Chúa, giờ đây
    theo lời Ngài đã hứa,
    xin để tôi tớ này
    được an bình ra đi.

    Vì chính mắt con được thấy ơn cứu độ
    Chúa đã dành sẵn cho muôn dân : *
    đó là ánh sáng soi đường cho dân ngoại,
    là vinh quang của Ít-ra-en dân Ngài.

    Vinh danh Chúa Cha và Chúa Con,
    cùng vinh danh Thánh Thần Thiên Chúa,

    tự muôn đời và chính hiện nay
    luôn mãi đến thiên thu vạn đại. A-men.

    <strong>ĐC</strong> Lạy Chúa, lúc chúng con còn thức,
    xin Ngài cứu vớt cho, *
    khi chúng con đã ngủ,
    xin Chúa cũng giữ gìn, *
    để cùng thức tỉnh với Đức Ki-tô,
    và nghỉ ngơi an bình.

<strong>Lời nguyện</strong> 
Lạy Chúa, xin viếng thăm chúng con đêm nay, để sớm mai, nhờ quyền năng Chúa, chúng con được thức dậy và hân hoan mừng ngày Đức Ki-tô phục sinh. Người hằng sống và hiển trị muôn đời.

<strong>Kết thúc</strong> 
<strong>Chủ sự:</strong> Xin Thiên Chúa toàn năng cho ta qua một đêm yên ổn và giờ sau hết được chết lành.
<strong>Cộng đoàn</strong> A-men.

<strong>CA VÃN KÍNH ĐỨC MẸ</strong> <i>(chọn 1 trong các bài sau)</i>
<strong>1. Kính chào Đức Nữ Vương</strong> (Salve Regina)
    Kính chào Đức Nữ Vương,
    Bà là Mẹ xót thương,
    Ngọt ngào cho cuộc sống,
    Kính chào Lẽ Cậy Trông !

    Này con cháu E-và,
    Thân phận người lưu lạc,
    Chúng con ngửa trông Bà,
    Kêu Bà mà khóc lóc,
    Than thở với rên la
    Trong lũng đầy nước mắt.

    Bà là Nữ Trạng Sư,
    Nguyện đưa mắt nhân từ,
    Phía đoàn con đoái lại ;

    Và sau đời khổ ải,
    Xin Bà khứng tỏ ra
    Cho đoàn con được thấy
    Quả phúc bởi lòng Bà :
    Đức Giê-su khả ái.

    Ôi lượng cả khoan hồng,
    Ôi tấm lòng xót thương,
    Ôi dịu hiền nhân hậu,
    Trinh Nữ Ma-ri-a. Amen.

<strong>2. Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc</strong> (Ave Regina caelorum)
    Kính lạy Bà, Vị Nữ Hoàng Thiên Quốc,
    Lạy Nữ Vương trên chín phẩm thiên thần,
    Là Cội Thiêng là Cửa Trời vinh phúc,
    Đem Vầng Hồng rực rỡ xuống trần gian.

    Mừng vui lên, mừng vui lên Trinh Nữ,
    Bà hiển vinh, Bà diễm lệ khôn tày.
    Bên toà Chúa Ki-tô, Ngôi Thánh Tử,
    Cúi lạy Bà, xin nguyện giúp cầu thay.

<strong>3. Lạy Đức Mẹ Chúa Trời</strong> (Sub tuum praesidium)
    Lạy Đức Mẹ Chúa Trời,
    Ngài xiết bao thánh thiện,
    Này chúng con chạy đến
    Tìm nương ẩn nơi Ngài.

    Lúc sa vòng gian khổ,
    Khi gặp cảnh phong trần,
    Lời con cái nài van,
    Xin Mẹ đừng chê bỏ.

    Nhưng xin hằng giải thoát
    Khỏi ngàn nỗi hiểm nguy,
    Ôi vinh diệu ai bì
    Trinh Nữ đầy ơn phước !
      `, 

              en: `
<strong>INTRODUCTION</strong>
<strong>Leader:</strong> God, come to my assistance.
<strong>All:</strong>  Lord, make haste to help me.
Glory to the Father, and to the Son, and to the Holy Spirit:
as it was in the beginning, is now, and will be for ever.<strong>Amen.</strong> <strong>(Halleluia)</strong>

<i>(A brief examination of conscience may be made. In the communal celebration of the Office, a Penitential Rite using the formulas of the Mass may be inserted here.)</i>

I confess to almighty God
and to you, my brothers and sisters,
that I have greatly sinned,
in my thoughts and in my words,
in what I have done and in what I have failed to do,
through my fault, through my fault,
through my most grievous fault;
therefore I ask blessed Mary ever-Virgin,
all the Angels and Saints,
and you, my brothers and sisters,
to pray for me to the Lord our God.
<strong><i>or</i></strong>
You were sent to heal the contrite of heart: Lord, have mercy.
<i>Lord, have mercy.</i>
You came to call sinners: Christ, have mercy.
<i>Christ, have mercy.</i>
You are seated at the right hand of the Father to intercede for us: Lord, have mercy.
<i>Lord, have mercy.</i>

<strong><i>The absolution by the presider follows:</i></strong>
<strong>Leader: </strong>May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. 
<strong>All: </strong>Amen.

<strong>HYMN</strong> <i>(choose one of the following two hymns.)</i>

<strong>1</strong>   We praise you, Father, for your gifts
    of duck and nightfall over earth,
    foreshadowing the mystery
    of death that leads to endless day.

    Within your hands we rest secure;
    in quiet sleep our strength renew;
    yet give your people hearts that wake
    in love to you, unsleeping Lord.

    Your glory may we ever seek
    in rest, as in activity ,
    until its fullness is revealed,
    o source of life, O Trinity.     
  
<strong>2</strong>   Day is done, but love unfailing
    Dwells ever here;
    Shadows fall, but hope prevailing,
    Calms ev'ry fear.
    Loving Father, none forsaking,
    Take our hearts, of love's own making,
    Watch our sleeping, guard our waking,
    Be always near.

    Dark descends, but light unending
    Shines through our night;
    You are with us, ever lending
    New strength to sight:
    One in love, your truth confessing,
    One in hope of heaven's blessing,
    May we see, in love's possessing,
    Love's endless light!

    Eyes will close, but you, unsleeping,
    Watch by our side;
    Death may come, in love's safekeeping
    Still we abide.
    God of love, all evil quelling,
    Sin forgiving, fear dispelling,
    Stay with us, our hearts indwelling,
    This eventide.
              
<strong>PSALMODY</strong>
              <i><strong>Psalm 88</strong></i>
<strong><i>Prayer of a very sick person</i></strong>
<i>This is your hour when darkness reigns (Luke 22:53).</i>

    <strong>Ant.</strong> Day and night I cry to you, my God.

    Lord my God, I call for help by day; *
    I cry at night before you.
    Let my prayer come into your presence. *
    O turn your ear to my cry.

    For my soul is filled with evils; *
    my life is on the brink of the grave.
    I am reckoned as one in the tomb: *
    I have reached the end of my strength,

    like one alone among the dead; *
    like the slain lying in their graves;
    like those you remember no more, *
    cut off, as they are, from your hand.

    You have laid me in the depths of the tomb, *
    in places that are dark, in the depths.
    Your anger weighs down upon me: *
    I am drowned beneath your waves.

    You have taken away my friends *
    and made me hateful in their sight.
    Imprisoned, I cannot escape; *
    my eyes are sunken with grief.

    I call to you, Lord, all the day long; *
    to you I stretch out my hands.
    Will you work your wonders for the dead? *
    Will the shades stand and praise you?

    Will your love be told in the grave *
    or your faithfulness among the dead?
    Will your wonders be known in the dark *
    or your justice in the land of oblivion?

    As for me, Lord, I call to you for help: *
    in the morning my prayer comes before you.
    Lord, why do you reject me? *
    Why do you hide your face?

    Wretched, close to death from my youth, *
    I have borne your trials; I am numb.
    Your fury has swept down upon me; *
    your terrors have utterly destroyed me.

    They surround me all the day like a flood, *
    they assail me all together.
    Friend and neighbor you have taken away: *
    my one companion is darkness.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Day and night I cry to you, my God.
              
<strong>READING</strong>           <i>(Jeremiah 14:9a)</i>
You are in our midst, O Lord, your name we bear: do not forsake us, O Lord, our God!
<i>(After listening to God's word, meditate quietly for a while.)</i>

<strong>RESPONSORY</strong>  
    <strong>V</strong> Into your hands, Lord, I commend my spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> I commend my spirit.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit.

    <strong>EASTER</strong>
    <strong>V</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.
    <strong>V</strong> You have redeemed us, Lord God of truth.
    <strong>R</strong> Alleluia, alleluia.
    <strong>V</strong> Glory to the Father, and to the Son, and to the Holy Spirit.
    <strong>R</strong> Into your hands, Lord, I commend my spirit, alleluia, alleluia.

<strong>Thánh ca Tin Mừng “Muôn lạy Chúa” </strong>(Nunc dimittis)
    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

    Lord, now you let your servant go in peace; *
    your word has been fulfilled:

    my own eyes have seen the salvation *
    which you have prepared in the sight of every people:

    a light to reveal you to the nations *
    and the glory of your people Israel.

    Glory to the Father, and to the Son, *
    and to the Holy Spirit:
    as it was in the beginning, is now, *
    and will be for ever. Amen.

    <strong>Ant.</strong> Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.

<strong>CONCLUDING PRAYER</strong> 
All-powerful God keep us united with your Son in his death and burial so that we may rise to new life with him, who lives and reigns for ever and ever. — Amen.
<strong>BLESSING</strong> 
<strong>Leader:</strong> May the all-powerful Lord grant us a restful night and a peaceful death.
<strong>All:</strong> A-men.

<strong>Antiphon or song in honor of the Blessed Virgin Mary</strong> <i>(choose one of the following songs)</i>

<strong>1</strong> Salve, Regína, mater misericórdiæ;
    vita, dulcédo et spes nostra, salve,
    Ad te clamámus, éxsules filíi Evæ.
    Ad te suspirámus, geméntes et flentes
    in hac lacrimárum valle.

    Eia ergo, advocáta nostra,
    illos tuos misericórdes ócculos
    ad nos convérte.
    Et Iesum, benedíctum fructum ventris tui,
    nobis post hoc exsílium osténde.
    O clemens, o pia, o dulcis Virgo María.


<strong>2</strong> Hail, holy Queen, mother of mercy,
    our life, our sweetness, and our hope.
    To you do we cry,
    poor banished children of Eve.
    To you do we send up our sighs
    mourning and weeping in this vale of tears.
    Turn then, most gracious advocate,
    your eyes of mercy toward us,
    and after this exile
    show us the blessed fruit of your womb, Jesus.
    O clement, O loving,
    O sweet Virgin Mary.

<strong>3</strong> Loving mother of the Redeemer,
    gate of heaven, star of the sea,
    assist your people who have fallen yet strive to rise again.
    To the wonderment of nature you bore your Creator,
    yet remained a virgin after as before.
    You who received Gabriel’s joyful greeting,
    have pity on us poor sinners.

    <i>(Easter Season)</i>
<strong>4</strong> Queen of heaven, rejoice, alleluia.
    The Son whom you merited to bear, alleluia,
    has risen as he said, alleluia.
    Rejoice and be glad, O Virgin Mary, alleluia!
    For the Lord has truly risen, alleluia.
      `,   
                }},



          ]
    },
    logoUrl: './photos/Logo-CM-tradicional-sin-fondo.png',
    headerTitle: { vi: 'Phụng Vụ Vinh Sơn', en: 'Vincentian Liturgy' },
    headerSubtitle: { vi: 'Dành cho gia đình Vinh Sơn', en: 'For the Vincentian Family'},
    mainSections: [
      { id: 'prayers', title: { vi: 'Kinh Nguyện', en: 'Prayers'}, icon: '' },
      {id: 'prayersoffice', title: { vi: 'Kinh Tối', en: 'Night Prayers'}, icon: '' }
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
