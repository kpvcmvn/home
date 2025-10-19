import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Feast, FeastType, SectionKey, MultilingualString, GenericContent, MainSection, LanguageConfig, SectionConfig, AboutContent } from './types';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import FeastList from './components/FeastList';
import FeastDetail from './components/FeastDetail';
import SectionView from './components/SectionView';
import GenericContentList from './components/PrayerList';
import GenericContentDetail from './components/PrayerDetail';
import AboutPage from './components/AboutPage';
import Spinner from './components/Spinner';
import ScrollToTopButton from './components/ScrollToTopButton';
import AdminLogin from './components/AdminLogin';
import AdminPanelModal from './components/AdminPanelModal';
import EditFeastModal from './components/EditFeastModal';
import EditSectionModal from './components/EditSectionModal';
import EditGenericContentModal from './components/EditPrayerModal';


// Data & Constants
import { FEASTS as initialFeasts } from './data';
import { SECTIONS_CONFIG } from './constants';
import { getMultilingualText as getMLText } from './utils/multilingual';

// Types to export
export type Theme = 'classic' | 'light' | 'dark' | 'black' | 'light-blue' | 'wood';
export type View = 'feastList' | 'feastDetail' | 'sectionView' | 'genericList' | 'genericDetail' | 'about';

export interface AppSettings {
  language: string; // current language code
  languages: LanguageConfig[];
  defaultLanguage: string;
  theme: Theme;
  fontSize: number;
  adminPassword?: string;
  footerContent: MultilingualString;
  feastTypes: FeastType[];
  mainSectionContents: Record<string, GenericContent[]>;
  logoUrl: string;
  headerTitle: MultilingualString;
  headerSubtitle: MultilingualString;
  mainSections: MainSection[];
  supportEmail: string;
  sectionsConfig: SectionConfig[];
  aboutContent: AboutContent;
}

const DEFAULT_SETTINGS: AppSettings = {
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
        vi: 'Nội dung được cung cấp cho mục đích phụng vụ và học hỏi. <br/> Mọi quyền được bảo lưu © 2024.',
        en: 'Content provided for liturgical and study purposes. <br/> All rights reserved © 2024.' 
    },
    feastTypes: [
        { name: { vi: 'Đại lễ', en: 'Solemnity' } },
        { name: { vi: 'Lễ kính', en: 'Feast' } },
        { name: { vi: 'Lễ nhớ', en: 'Memorial' } },
        { name: { vi: 'Kỷ niệm', en: 'Commemoration' } },
    ],
    mainSectionContents: {
        prayers: [
          {
            id: 'kinh-lay-cha',
            title: {
              vi: 'Kinh Lạy Cha',
              en: 'Our Father',
              es: 'Padre Nuestro',
              fr: 'Notre Père',
              la: 'Pater Noster'
            },
            content: {
              vi: `<p>Lạy Cha chúng con ở trên trời, chúng con nguyện danh Cha cả sáng, nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời.</p><p>Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con, như chúng con cũng tha kẻ có nợ chúng con.</p><p>Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ.</p><p>Amen.</p>`,
              en: `<p>Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven.</p><p>Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us;</p><p>and lead us not into temptation, but deliver us from evil.</p><p>Amen.</p>`,
              es: `<p>Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.</p><p>Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden;</p><p>no nos dejes caer en la tentación, y líbranos del mal.</p><p>Amén.</p>`,
              fr: `<p>Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel.</p><p>Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés.</p><p>Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal.</p><p>Amen.</p>`,
              la: `<p>Pater noster, qui es in caelis, sanctificétur nomen tuum. Advéniat regnum tuum. Fiat volúntas tua, sicut in caelo, et in terra.</p><p>Panem nostrum cotidiánum da nobis hódie, et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris.</p><p>Et ne nos indúcas in tentatiónem, sed líbera nos a malo.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-kinh-mung',
            title: {
              vi: 'Kinh Kính Mừng',
              en: 'Hail Mary',
              es: 'Dios te salve, María',
              fr: 'Je vous salue, Marie',
              la: 'Ave Maria'
            },
            content: {
              vi: `<p>Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà, Bà có phúc lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phúc lạ.</p><p>Thánh Maria, Đức Mẹ Chúa Trời, cầu cho chúng con là kẻ có tội, khi nay và trong giờ lâm tử.</p><p>Amen.</p>`,
              en: `<p>Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.</p><p>Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death.</p><p>Amen.</p>`,
              es: `<p>Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.</p><p>Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte.</p><p>Amén.</p>`,
              fr: `<p>Je vous salue, Marie, pleine de grâce; le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni.</p><p>Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant et à l'heure de notre mort.</p><p>Amen.</p>`,
              la: `<p>Ave, María, grátia plena, Dóminus tecum. Benedícta tu in mulieribus, et benedíctus fructus ventris tui, Iesus.</p><p>Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-sang-danh',
            title: {
              vi: 'Kinh Sáng Danh',
              en: 'Glory Be',
              es: 'Gloria al Padre',
              fr: 'Gloire au Père',
              la: 'Gloria Patri'
            },
            content: {
              vi: `<p>Sáng danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần.</p><p>Như đã có trước vô cùng, và bây giờ, và hằng có, và đời đời chẳng cùng.</p><p>Amen.</p>`,
              en: `<p>Glory be to the Father, and to the Son, and to the Holy Spirit.</p><p>As it was in the beginning, is now, and ever shall be, world without end.</p><p>Amen.</p>`,
              es: `<p>Gloria al Padre, y al Hijo, y al Espíritu Santo.</p><p>Como era en el principio, ahora y siempre, por los siglos de los siglos.</p><p>Amén.</p>`,
              fr: `<p>Gloire au Père, et au Fils, et au Saint-Esprit.</p><p>Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles.</p><p>Amen.</p>`,
              la: `<p>Glória Patri, et Fílio, et Spirítui Sancto.</p><p>Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-tin-kinh',
            title: {
              vi: 'Kinh Tin Kính',
              en: 'Apostles\' Creed',
              es: 'Credo de los Apóstoles',
              fr: 'Symbole des Apôtres',
              la: 'Symbolum Apostolorum'
            },
            content: {
              vi: `<p>Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất.</p><p>Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha cùng là Chúa chúng tôi; bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh: chịu nạn đời quan Phongxiô Philatô, chịu đóng đanh trên cây Thánh Giá, chết và táng xác; xuống ngục tổ tông, ngày thứ ba bởi trong kẻ chết mà sống lại; lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng; ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết.</p><p>Tôi tin kính Đức Chúa Thánh Thần. Tôi tin có Hội Thánh hằng có ở khắp thế này, các thánh thông công. Tôi tin phép tha tội. Tôi tin xác loài người ngày sau sống lại. Tôi tin hằng sống vậy.</p><p>Amen.</p>`,
              en: `<p>I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead.</p><p>I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting.</p><p>Amen.</p>`,
              es: `<p>Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.</p><p>Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna.</p><p>Amén.</p>`,
              fr: `<p>Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre. Et en Jésus-Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers, le troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d’où il viendra juger les vivants et les morts.</p><p>Je crois au Saint-Esprit, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle.</p><p>Amen.</p>`,
              la: `<p>Credo in Deum Patrem omnipoténtem, Creatórem cæli et terræ. Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum, qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus, descéndit ad ínferos, tértia die resurréxit a mórtuis, ascéndit ad cælos, sedet ad déxteram Dei Patris omnipoténtis, inde ventúrus est iudicáre vivos et mórtuos.</p><p>Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-tin',
            title: {
              vi: 'Kinh Tin',
              en: 'Act of Faith',
              es: 'Acto de Fe',
              fr: 'Acte de Foi',
              la: 'Actus Fidei'
            },
            content: {
              vi: `<p>Lạy Chúa con, con tin thật có một Đức Chúa Trời là Đấng thưởng phạt vô cùng. Con lại tin thật Đức Chúa Trời có Ba Ngôi, mà Ngôi Thứ Hai đã xuống thế làm người, chịu nạn chịu chết mà chuộc tội cho thiên hạ.</p><p>Bấy nhiêu điều ấy cùng các điều khác Hội Thánh dạy, thì con tin vững vàng, vì Chúa là Đấng thông minh và chân thật vô cùng đã phán truyền cho Hội Thánh.</p><p>Amen.</p>`,
              en: `<p>O my God, I firmly believe that you are one God in three divine Persons, Father, Son, and Holy Spirit. I believe that your divine Son became man and died for our sins, and that he will come to judge the living and the dead.</p><p>I believe these and all the truths which the Holy Catholic Church teaches, because you have revealed them, who can neither deceive nor be deceived.</p><p>Amen.</p>`,
              es: `<p>Dios mío, creo firmemente todo lo que la Santa Iglesia Católica y Apostólica me enseña, porque tú, que eres la suma verdad, se lo has revelado; y en esta fe quiero vivir y morir.</p><p>Amén.</p>`,
              fr: `<p>Mon Dieu, je crois fermement toutes les vérités que vous nous avez révélées et que vous nous enseignez par votre sainte Église, parce que vous ne pouvez ni vous tromper ni nous tromper.</p><p>Amen.</p>`,
              la: `<p>Dómine Deus, firma fide credo et confíteor ómnia et síngula quæ sancta Ecclésia Cathólica propónit, quia tu, Deus, ea ómnia revelásti, qui es ætérna véritas et sapiéntia quæ nec fállere nec falli potest. In hac fide vívere et mori státuo.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-cay',
            title: {
              vi: 'Kinh Cậy',
              en: 'Act of Hope',
              es: 'Acto de Esperanza',
              fr: 'Acte d\'Espérance',
              la: 'Actus Spei'
            },
            content: {
              vi: `<p>Lạy Chúa con, con trông cậy vững vàng vì công nghiệp Đức Chúa Giêsu, thì Chúa sẽ ban ơn cho con giữ đạo nên ở đời này, cho ngày sau được lên thiên đàng xem thấy mặt Đức Chúa Trời hưởng phước đời đời, vì Chúa là Đấng phép tắc và lòng lành vô cùng đã phán hứa sự ấy chẳng có lẽ nào sai được.</p><p>Amen.</p>`,
              en: `<p>O my God, relying on your infinite goodness and promises, I hope to obtain pardon of my sins, the help of your grace, and life everlasting, through the merits of Jesus Christ, my Lord and Redeemer.</p><p>Amen.</p>`,
              es: `<p>Dios mío, espero y confío que, por los méritos de la Pasión y Muerte de Nuestro Señor Jesucristo, me darás tu santa gracia en esta vida y en la otra la gloria, como lo tienes prometido a los que hacen buenas obras, como yo propongo hacerlas con tu ayuda.</p><p>Amén.</p>`,
              fr: `<p>Mon Dieu, j'espère avec la plus ferme confiance que vous me donnerez, par les mérites de Jésus-Christ, votre grâce en ce monde et, si j'observe vos commandements, le bonheur éternel dans l'autre, parce que vous l'avez promis et que vous êtes fidèle dans vos promesses.</p><p>Amen.</p>`,
              la: `<p>Dómine Deus, spero per grátiam tuam remissiónem ómnium peccatórum, et post hanc vitam ætérnam felicitátem me esse consecutúrum: quia tu promisísti, qui es infiníte potens, fidélis, benígnus, et miséricors. In hac spe vívere et mori státuo.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-men',
            title: {
              vi: 'Kinh Mến',
              en: 'Act of Love',
              es: 'Acto de Caridad',
              fr: 'Acte de Charité',
              la: 'Actus Caritatis'
            },
            content: {
              vi: `<p>Lạy Chúa con, con kính mến Chúa hết lòng hết sức trên hết mọi sự, vì Chúa là Đấng trọn tốt trọn lành vô cùng.</p><p>Lại vì Chúa thì con thương yêu người ta như mình con vậy.</p><p>Amen.</p>`,
              en: `<p>O my God, I love you above all things, with my whole heart and soul, because you are all-good and worthy of all love.</p><p>I love my neighbor as myself for the love of you. I forgive all who have injured me, and ask pardon of all whom I have injured.</p><p>Amen.</p>`,
              es: `<p>Dios mío, te amo sobre todas las cosas y a mi prójimo como a mí mismo por amor a Ti.</p><p>Antes querría morir que ofenderte.</p><p>Amén.</p>`,
              fr: `<p>Mon Dieu, je vous aime de tout mon coeur et par-dessus toutes choses, parce que vous êtes infiniment bon et infiniment aimable, et j'aime mon prochain comme moi-même pour l'amour de vous.</p><p>Amen.</p>`,
              la: `<p>Dómine Deus, amo te super ómnia et próximum meum propter te, quia tu es summum, infinítum, et perfectíssimum bonum, omni dilectióne dignum. In hac caritáte vívere et mori státuo.</p><p>Amen.</p>`
            }
          },
          {
            id: 'kinh-truyen-tin',
            title: {
              vi: 'Kinh Truyền Tin',
              en: 'The Angelus',
              es: 'El Ángelus',
              fr: 'L\'Angélus',
              la: 'Angelus Domini'
            },
            content: {
              vi: `<p><strong>X.</strong> Đức Chúa Trời đã truyền tin cho Rất Thánh Đức Bà Maria.</p><p><strong>Đ.</strong> Và Rất Thánh Đức Bà đã chịu thai bởi phép Đức Chúa Thánh Thần.</p><p><em>Kính mừng Maria...</em></p><p><strong>X.</strong> Này tôi là tôi tá Đức Chúa Trời.</p><p><strong>Đ.</strong> Tôi xin vâng như lời Thánh Thiên Thần truyền.</p><p><em>Kính mừng Maria...</em></p><p><strong>X.</strong> Chốc ấy Ngôi Thứ Hai đã xuống thế làm người.</p><p><strong>Đ.</strong> Và đã ở cùng chúng tôi.</p><p><em>Kính mừng Maria...</em></p><p><strong>X.</strong> Lạy Rất Thánh Đức Mẹ Chúa Trời, xin cầu cho chúng con.</p><p><strong>Đ.</strong> Đáng chịu lấy những sự Chúa Kitô đã hứa.</p><p><strong>Lời nguyện:</strong> Lạy Chúa, chúng con xin Chúa ban ơn xuống trong linh hồn chúng con, là kẻ đã nhờ lời Thánh Thiên Thần truyền, mà biết thật Chúa Kitô là con Chúa đã xuống thế làm người, thì xin vì công ơn Chúa chịu nạn chịu chết trên cây Thánh Giá, cho chúng con ngày sau khi sống lại, được đến nơi vinh hiển, cũng vì công nghiệp Chúa Kitô là Chúa chúng con. Amen.</p>`,
              en: `<p><strong>V.</strong> The Angel of the Lord declared unto Mary.</p><p><strong>R.</strong> And she conceived of the Holy Spirit.</p><p><em>Hail Mary...</em></p><p><strong>V.</strong> Behold the handmaid of the Lord.</p><p><strong>R.</strong> Be it done unto me according to thy word.</p><p><em>Hail Mary...</em></p><p><strong>V.</strong> And the Word was made flesh.</p><p><strong>R.</strong> And dwelt among us.</p><p><em>Hail Mary...</em></p><p><strong>V.</strong> Pray for us, O Holy Mother of God.</p><p><strong>R.</strong> That we may be made worthy of the promises of Christ.</p><p><strong>Let us pray:</strong> Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the incarnation of Christ, Thy Son, was made known by the message of an angel, may by His Passion and Cross be brought to the glory of His Resurrection, through the same Christ Our Lord. Amen.</p>`,
              es: `<p><strong>V.</strong> El Ángel del Señor anunció a María.</p><p><strong>R.</strong> Y concibió por obra del Espíritu Santo.</p><p><em>Dios te salve, María...</em></p><p><strong>V.</strong> He aquí la esclava del Señor.</p><p><strong>R.</strong> Hágase en mí según tu palabra.</p><p><em>Dios te salve, María...</em></p><p><strong>V.</strong> Y el Verbo se hizo carne.</p><p><strong>R.</strong> Y habitó entre nosotros.</p><p><em>Dios te salve, María...</em></p><p><strong>V.</strong> Ruega por nosotros, Santa Madre de Dios.</p><p><strong>R.</strong> Para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.</p><p><strong>Oración:</strong> Te suplicamos, Señor, que derrames tu gracia en nuestras almas, para que los que, por el anuncio del Ángel, hemos conocido la encarnación de tu Hijo, Jesucristo, por su Pasión y Cruz, seamos llevados a la gloria de la Resurrección. Por el mismo Jesucristo, nuestro Señor. Amén.</p>`,
              fr: `<p><strong>V.</strong> L'ange du Seigneur apporta l'annonce à Marie.</p><p><strong>R.</strong> Et elle conçut du Saint-Esprit.</p><p><em>Je vous salue, Marie...</em></p><p><strong>V.</strong> Voici la Servante du Seigneur.</p><p><strong>R.</strong> Qu'il me soit fait selon votre parole.</p><p><em>Je vous salue, Marie...</em></p><p><strong>V.</strong> Et le Verbe s'est fait chair.</p><p><strong>R.</strong> Et il a habité parmi nous.</p><p><em>Je vous salue, Marie...</em></p><p><strong>V.</strong> Priez pour nous, sainte Mère de Dieu.</p><p><strong>R.</strong> Afin que nous soyons rendus dignes des promesses du Christ.</p><p><strong>Prions:</strong> Que ta grâce, Seigneur, se répande en nos cœurs. Par le message de l'ange, tu nous as fait connaître l'Incarnation de ton Fils bien-aimé. Conduis-nous, par sa passion et par sa croix, jusqu'à la gloire de la résurrection. Par le Christ, notre Seigneur. Amen.</p>`,
              la: `<p><strong>V.</strong> Angelus Domini nuntiavit Mariæ.</p><p><strong>R.</strong> Et concepit de Spiritu Sancto.</p><p><em>Ave Maria...</em></p><p><strong>V.</strong> Ecce ancilla Domini.</p><p><strong>R.</strong> Fiat mihi secundum verbum tuum.</p><p><em>Ave Maria...</em></p><p><strong>V.</strong> Et Verbum caro factum est.</p><p><strong>R.</strong> Et habitavit in nobis.</p><p><em>Ave Maria...</em></p><p><strong>V.</strong> Ora pro nobis, Sancta Dei Genetrix.</p><p><strong>R.</strong> Ut digni efficiamur promissionibus Christi.</p><p><strong>Oremus:</strong> Gratiam tuam, quæsumus, Domine, mentibus nostris infunde; ut qui, Angelo nuntiante, Christi Filii tui incarnationem cognovimus, per passionem eius et crucem, ad resurrectionis gloriam perducamur. Per eundem Christum Dominum nostrum. Amen.</p>`
            }
          },
          {
            id: 'kinh-lay-nu-vuong',
            title: {
              vi: 'Kinh Lạy Nữ Vương',
              en: 'Hail, Holy Queen',
              es: 'Salve, Reina',
              fr: 'Salve Regina',
              la: 'Salve Regina'
            },
            content: {
              vi: `<p>Lạy Nữ Vương, Mẹ nhân lành, làm cho chúng con được sống, được vui, được cậy. Thân lạy Mẹ, chúng con, con cháu Evà ở chốn khách đầy, kêu đến cùng Bà. Chúng con ở nơi khóc lóc, than thở, kêu khấn Bà thương.</p><p>Hỡi ôi! Bà là chủ bầu chúng con, xin ghé mắt thương xem chúng con. Đến sau khỏi đày, xin cho chúng con được thấy Đức Chúa Giêsu, con lòng Bà gồm phúc lạ.</p><p>Ôi khoan thay! Nhân thay! Dịu thay! Thánh Maria trọn đời đồng trinh.</p><p>Amen.</p>`,
              en: `<p>Hail, holy Queen, Mother of Mercy, hail, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this vale of tears.</p><p>Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus.</p><p>O clement, O loving, O sweet Virgin Mary.</p><p>Amen.</p>`,
              es: `<p>Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando, en este valle de lágrimas.</p><p>Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre.</p><p>¡Oh clementísima, oh piadosa, oh dulce Virgen María! Ruega por nosotros, santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo.</p><p>Amén.</p>`,
              fr: `<p>Salut, ô Reine, Mère de miséricorde, notre vie, notre douceur et notre espérance, salut !</p><p>Enfants d'Ève, exilés, nous crions vers vous ; vers vous nous soupirons, gémissant et pleurant dans cette vallée de larmes.</p><p>Ô vous, notre avocate, tournez vers nous vos regards miséricordieux. Et, après cet exil, montrez-nous Jésus, le fruit béni de vos entrailles.</p><p>Ô clémente, ô pieuse, ô douce Vierge Marie.</p><p>Amen.</p>`,
              la: `<p>Salve, Regína, Mater misericórdiæ, vita, dulcédo et spes nostra, salve. Ad te clamámus, éxsules fílii Hevæ. Ad te suspirámus geméntes et flentes in hac lacrimárum valle.</p><p>Eia ergo, advocáta nostra, illos tuos misericórdes óculos ad nos convérte. Et Iesum, benedíctum fructum ventris tui, nobis post hoc exsílium osténde.</p><p>O clemens, o pia, o dulcis Virgo María.</p><p>Amen.</p>`
            }
          },
          {
            id: 'nam-su-vui',
            title: {
              vi: 'Năm Sự Vui',
              en: 'The Joyful Mysteries',
              es: 'Los Misterios Gozosos',
              fr: 'Les Mystères Joyeux',
              la: 'Mysteria Gaudiosa'
            },
            content: {
              vi: `<h3>Năm Sự Vui (Thứ Hai & Thứ Bảy)</h3><ol><li><strong>Thứ nhất thì ngắm:</strong> Thiên Thần truyền tin cho Đức Bà chịu thai. Ta hãy xin cho được ở khiêm nhường.</li><li><strong>Thứ hai thì ngắm:</strong> Đức Bà đi viếng bà thánh Isave. Ta hãy xin cho được lòng yêu người.</li><li><strong>Thứ ba thì ngắm:</strong> Đức Bà sinh Đức Chúa Giêsu trong hang đá. Ta hãy xin cho được lòng khó khăn.</li><li><strong>Thứ bốn thì ngắm:</strong> Đức Bà dâng Đức Chúa Giêsu trong Đền Thánh. Ta hãy xin cho được vâng lời chịu lụy.</li><li><strong>Thứ năm thì ngắm:</strong> Đức Bà tìm được Đức Chúa Giêsu trong Đền Thánh. Ta hãy xin cho được giữ nghĩa cùng Chúa luôn.</li></ol>`,
              en: `<h3>The Joyful Mysteries (Monday & Saturday)</h3><ol><li><strong>The First Mystery:</strong> The Annunciation of the Angel Gabriel to Mary. Fruit of the Mystery: Humility.</li><li><strong>The Second Mystery:</strong> The Visitation of Mary to Elizabeth. Fruit of the Mystery: Love of Neighbor.</li><li><strong>The Third Mystery:</strong> The Nativity of Jesus in Bethlehem. Fruit of the Mystery: Poverty of Spirit.</li><li><strong>The Fourth Mystery:</strong> The Presentation of Jesus at the Temple. Fruit of the Mystery: Obedience.</li><li><strong>The Fifth Mystery:</strong> The Finding of Jesus in the Temple. Fruit of the Mystery: Joy in Finding Jesus.</li></ol>`,
              es: `<h3>Los Misterios Gozosos (Lunes y Sábado)</h3><ol><li><strong>El Primer Misterio:</strong> La Anunciación del Ángel a María. Fruto del Misterio: Humildad.</li><li><strong>El Segundo Misterio:</strong> La Visitación de María a su prima Isabel. Fruto del Misterio: Amor al prójimo.</li><li><strong>El Tercer Misterio:</strong> El Nacimiento de Jesús en Belén. Fruto del Misterio: Pobreza de espíritu.</li><li><strong>El Cuarto Misterio:</strong> La Presentación de Jesús en el Templo. Fruto del Misterio: Obediencia.</li><li><strong>El Quinto Misterio:</strong> El Niño Jesús perdido y hallado en el Templo. Fruto del Misterio: Alegría de encontrar a Jesús.</li></ol>`,
              fr: `<h3>Les Mystères Joyeux (Lundi et Samedi)</h3><ol><li><strong>Le Premier Mystère :</strong> L'Annonciation de l'Ange Gabriel à Marie. Fruit du Mystère : L'humilité.</li><li><strong>Le Deuxième Mystère :</strong> La Visitation de Marie à sa cousine Élisabeth. Fruit du Mystère : L'amour du prochain.</li><li><strong>Le Troisième Mystère :</strong> La Nativité de Jésus à Bethléem. Fruit du Mystère : L'esprit de pauvreté.</li><li><strong>Le Quatrième Mystère :</strong> La Présentation de Jésus au Temple. Fruit du Mystère : L'obéissance.</li><li><strong>Le Cinquième Mystère :</strong> Le Recouvrement de Jésus au Temple. Fruit du Mystère : La joie de retrouver Jésus.</li></ol>`,
              la: `<h3>Mysteria Gaudiosa (Feria Secunda et Sabbato)</h3><ol><li><strong>Primum Mysterium:</strong> Annuntiatio. Fructus Mysterii: Humilitas.</li><li><strong>Secundum Mysterium:</strong> Visitatio. Fructus Mysterii: Caritas erga proximum.</li><li><strong>Tertium Mysterium:</strong> Nativitas Iesu. Fructus Mysterii: Paupertas spiritus.</li><li><strong>Quartum Mysterium:</strong> Praesentatio Iesu in Templo. Fructus Mysterii: Oboedientia.</li><li><strong>Quintum Mysterium:</strong> Inventio Iesu in Templo. Fructus Mysterii: Gaudium in inveniendo Iesum.</li></ol>`
            }
          },
          {
            id: 'nam-su-sang',
            title: {
              vi: 'Năm Sự Sáng',
              en: 'The Luminous Mysteries',
              es: 'Los Misterios Luminosos',
              fr: 'Les Mystères Lumineux',
              la: 'Mysteria Luminosa'
            },
            content: {
              vi: `<h3>Năm Sự Sáng (Thứ Năm)</h3><ol><li><strong>Thứ nhất thì ngắm:</strong> Đức Chúa Giêsu chịu phép rửa tại sông Giođan. Ta hãy xin cho được sống xứng đáng là con cái Chúa.</li><li><strong>Thứ hai thì ngắm:</strong> Đức Chúa Giêsu làm phép lạ tại tiệc cưới Cana. Ta hãy xin cho được noi gương Đức Mẹ mà vững tin vào Chúa.</li><li><strong>Thứ ba thì ngắm:</strong> Đức Chúa Giêsu rao giảng Nước Trời và kêu gọi sám hối. Ta hãy xin cho được hoán cải và đón nhận Tin Mừng.</li><li><strong>Thứ bốn thì ngắm:</strong> Đức Chúa Giêsu biến hình trên núi. Ta hãy xin cho được lắng nghe và thực hành Lời Người.</li><li><strong>Thứ năm thì ngắm:</strong> Đức Chúa Giêsu lập bí tích Thánh Thể. Ta hãy xin cho được năng kết hiệp cùng Chúa Giêsu Thánh Thể.</li></ol>`,
              en: `<h3>The Luminous Mysteries (Thursday)</h3><ol><li><strong>The First Mystery:</strong> The Baptism of Jesus in the Jordan. Fruit of the Mystery: Openness to the Holy Spirit.</li><li><strong>The Second Mystery:</strong> The Wedding at Cana. Fruit of the Mystery: To Jesus through Mary.</li><li><strong>The Third Mystery:</strong> The Proclamation of the Kingdom of God. Fruit of the Mystery: Repentance and Trust in God.</li><li><strong>The Fourth Mystery:</strong> The Transfiguration of Jesus. Fruit of the Mystery: Desire for Holiness.</li><li><strong>The Fifth Mystery:</strong> The Institution of the Eucharist. Fruit of the Mystery: Adoration.</li></ol>`,
              es: `<h3>Los Misterios Luminosos (Jueves)</h3><ol><li><strong>El Primer Misterio:</strong> El Bautismo de Jesús en el Jordán. Fruto del Misterio: Apertura al Espíritu Santo.</li><li><strong>El Segundo Misterio:</strong> Las bodas de Caná. Fruto del Misterio: A Jesús por María.</li><li><strong>El Tercer Misterio:</strong> El anuncio del Reino de Dios. Fruto del Misterio: Arrepentimiento y confianza en Dios.</li><li><strong>El Cuarto Misterio:</strong> La Transfiguración de Jesús. Fruto del Misterio: Deseo de santidad.</li><li><strong>El Quinto Misterio:</strong> La Institución de la Eucaristía. Fruto del Misterio: Adoración.</li></ol>`,
              fr: `<h3>Les Mystères Lumineux (Jeudi)</h3><ol><li><strong>Le Premier Mystère :</strong> Le Baptême de Jésus dans le Jourdain. Fruit du Mystère : L'ouverture à l'Esprit Saint.</li><li><strong>Le Deuxième Mystère :</strong> Les Noces de Cana. Fruit du Mystère : À Jésus par Marie.</li><li><strong>Le Troisième Mystère :</strong> L'annonce du Royaume de Dieu. Fruit du Mystère : La repentance et la confiance en Dieu.</li><li><strong>Le Quatrième Mystère :</strong> La Transfiguration de Jésus. Fruit du Mystère : Le désir de sainteté.</li><li><strong>Le Cinquième Mystère :</strong> L'Institution de l'Eucharistie. Fruit du Mystère : L'adoration.</li></ol>`,
              la: `<h3>Mysteria Luminosa (Feria Quinta)</h3><ol><li><strong>Primum Mysterium:</strong> Baptisma Iesu in Iordane. Fructus Mysterii: Apertio ad Spiritum Sanctum.</li><li><strong>Secundum Mysterium:</strong> Miraculum in Cananensi convivio. Fructus Mysterii: Ad Iesum per Mariam.</li><li><strong>Tertium Mysterium:</strong> Proclamatio Regni Dei. Fructus Mysterii: Paenitentia et fiducia in Deum.</li><li><strong>Quartum Mysterium:</strong> Transfiguratio Iesu. Fructus Mysterii: Desiderium sanctitatis.</li><li><strong>Quintum Mysterium:</strong> Institutio Eucharistiae. Fructus Mysterii: Adoratio.</li></ol>`
            }
          },
          {
            id: 'nam-su-thuong',
            title: {
              vi: 'Năm Sự Thương',
              en: 'The Sorrowful Mysteries',
              es: 'Los Misterios Dolorosos',
              fr: 'Les Mystères Douloureux',
              la: 'Mysteria Dolorosa'
            },
            content: {
              vi: `<h3>Năm Sự Thương (Thứ Ba & Thứ Sáu)</h3><ol><li><strong>Thứ nhất thì ngắm:</strong> Đức Chúa Giêsu lo buồn đổ mồ hôi máu. Ta hãy xin cho được ăn năn tội nên.</li><li><strong>Thứ hai thì ngắm:</strong> Đức Chúa Giêsu chịu đánh đòn. Ta hãy xin cho được hãm mình chịu khó bằng lòng.</li><li><strong>Thứ ba thì ngắm:</strong> Đức Chúa Giêsu chịu đội mão gai. Ta hãy xin cho được chịu mọi sự sỉ nhục bằng lòng.</li><li><strong>Thứ bốn thì ngắm:</strong> Đức Chúa Giêsu vác cây Thánh Giá. Ta hãy xin cho được vác Thánh Giá theo chân Chúa.</li><li><strong>Thứ năm thì ngắm:</strong> Đức Chúa Giêsu chịu chết trên cây Thánh Giá. Ta hãy xin cho được đóng đanh tính xác thịt vào Thánh Giá Chúa.</li></ol>`,
              en: `<h3>The Sorrowful Mysteries (Tuesday & Friday)</h3><ol><li><strong>The First Mystery:</strong> The Agony of Jesus in the Garden. Fruit of the Mystery: Sorrow for Sin.</li><li><strong>The Second Mystery:</strong> The Scourging at the Pillar. Fruit of the Mystery: Purity.</li><li><strong>The Third Mystery:</strong> The Crowning with Thorns. Fruit of the Mystery: Courage.</li><li><strong>The Fourth Mystery:</strong> The Carrying of the Cross. Fruit of the Mystery: Patience.</li><li><strong>The Fifth Mystery:</strong> The Crucifixion and Death of Jesus. Fruit of the Mystery: Perseverance.</li></ol>`,
              es: `<h3>Los Misterios Dolorosos (Martes y Viernes)</h3><ol><li><strong>El Primer Misterio:</strong> La Oración de Jesús en el Huerto. Fruto del Misterio: Dolor por el pecado.</li><li><strong>El Segundo Misterio:</strong> La Flagelación de Jesús atado a la columna. Fruto del Misterio: Pureza.</li><li><strong>El Tercer Misterio:</strong> La Coronación de espinas. Fruto del Misterio: Valentía.</li><li><strong>El Cuarto Misterio:</strong> Jesús con la Cruz a cuestas camino del Calvario. Fruto del Misterio: Paciencia.</li><li><strong>El Quinto Misterio:</strong> La Crucifixión y Muerte de Jesús. Fruto del Misterio: Perseverancia.</li></ol>`,
              fr: `<h3>Les Mystères Douloureux (Mardi et Vendredi)</h3><ol><li><strong>Le Premier Mystère :</strong> L'Agonie de Jésus au Jardin des Oliviers. Fruit du Mystère : Le regret de nos péchés.</li><li><strong>Le Deuxième Mystère :</strong> La Flagellation de Jésus. Fruit du Mystère : La pureté.</li><li><strong>Le Troisième Mystère :</strong> Le Couronnement d'épines. Fruit du Mystère : Le courage.</li><li><strong>Le Quatrième Mystère :</strong> Le Portement de la Croix. Fruit du Mystère : La patience.</li><li><strong>Le Cinquième Mystère :</strong> La Crucifixion et la Mort de Jésus. Fruit du Mystère : La persévérance.</li></ol>`,
              la: `<h3>Mysteria Dolorosa (Feria Tertia et Feria Sexta)</h3><ol><li><strong>Primum Mysterium:</strong> Agonia in Horto. Fructus Mysterii: Dolor pro peccatis.</li><li><strong>Secundum Mysterium:</strong> Flagellatio. Fructus Mysterii: Puritas.</li><li><strong>Tertium Mysterium:</strong> Coronatio Spinis. Fructus Mysterii: Fortitudo.</li><li><strong>Quartum Mysterium:</strong> Baiulatio Crucis. Fructus Mysterii: Patientia.</li><li><strong>Quintum Mysterium:</strong> Crucifixio et Mors Iesu. Fructus Mysterii: Perseverantia.</li></ol>`
            }
          },
          {
            id: 'nam-su-mung',
            title: {
              vi: 'Năm Sự Mừng',
              en: 'The Glorious Mysteries',
              es: 'Los Misterios Gloriosos',
              fr: 'Les Mystères Glorieux',
              la: 'Mysteria Gloriosa'
            },
            content: {
              vi: `<h3>Năm Sự Mừng (Thứ Tư & Chúa Nhật)</h3><ol><li><strong>Thứ nhất thì ngắm:</strong> Đức Chúa Giêsu sống lại. Ta hãy xin cho được sống lại thật về phần linh hồn.</li><li><strong>Thứ hai thì ngắm:</strong> Đức Chúa Giêsu lên trời. Ta hãy xin cho được ái mộ những sự trên trời.</li><li><strong>Thứ ba thì ngắm:</strong> Đức Chúa Thánh Thần hiện xuống. Ta hãy xin cho được lòng đầy dẫy mọi ơn Đức Chúa Thánh Thần.</li><li><strong>Thứ bốn thì ngắm:</strong> Đức Chúa Trời cho Đức Bà lên trời. Ta hãy xin ơn chết lành trong tay Đức Mẹ.</li><li><strong>Thứ năm thì ngắm:</strong> Đức Chúa Trời thưởng Đức Mẹ trên trời. Ta hãy xin Đức Mẹ phù hộ cho ta được thưởng cùng Đức Mẹ trên nước thiên đàng.</li></ol>`,
              en: `<h3>The Glorious Mysteries (Wednesday & Sunday)</h3><ol><li><strong>The First Mystery:</strong> The Resurrection of Jesus. Fruit of the Mystery: Faith.</li><li><strong>The Second Mystery:</strong> The Ascension of Jesus into Heaven. Fruit of the Mystery: Hope.</li><li><strong>The Third Mystery:</strong> The Descent of the Holy Spirit. Fruit of the Mystery: Love of God.</li><li><strong>The Fourth Mystery:</strong> The Assumption of Mary into Heaven. Fruit of the Mystery: Grace of a Happy Death.</li><li><strong>The Fifth Mystery:</strong> The Coronation of Mary as Queen of Heaven and Earth. Fruit of the Mystery: Trust in Mary's Intercession.</li></ol>`,
              es: `<h3>Los Misterios Gloriosos (Miércoles y Domingo)</h3><ol><li><strong>El Primer Misterio:</strong> La Resurrección de Jesús. Fruto del Misterio: Fe.</li><li><strong>El Segundo Misterio:</strong> La Ascensión de Jesús al Cielo. Fruto del Misterio: Esperanza.</li><li><strong>El Tercer Misterio:</strong> La Venida del Espíritu Santo. Fruto del Misterio: Amor de Dios.</li><li><strong>El Cuarto Misterio:</strong> La Asunción de María al Cielo. Fruto del Misterio: Gracia de una muerte feliz.</li><li><strong>El Quinto Misterio:</strong> La Coronación de María como Reina del Cielo y de la Tierra. Fruto del Misterio: Confianza en la intercesión de María.</li></ol>`,
              fr: `<h3>Les Mystères Glorieux (Mercredi et Dimanche)</h3><ol><li><strong>Le Premier Mystère :</strong> La Résurrection de Jésus. Fruit du Mystère : La foi.</li><li><strong>Le Deuxième Mystère :</strong> L'Ascension de Jésus au Ciel. Fruit du Mystère : L'espérance.</li><li><strong>Le Troisième Mystère :</strong> La Pentecôte, la descente du Saint-Esprit. Fruit du Mystère : L'amour de Dieu.</li><li><strong>Le Quatrième Mystère :</strong> L'Assomption de Marie au Ciel. Fruit du Mystère : La grâce d'une bonne mort.</li><li><strong>Le Cinquième Mystère :</strong> Le Couronnement de Marie dans le Ciel. Fruit du Mystère : La confiance en l'intercession de Marie.</li></ol>`,
              la: `<h3>Mysteria Gloriosa (Feria Quarta et Dominica)</h3><ol><li><strong>Primum Mysterium:</strong> Resurrectio Iesu. Fructus Mysterii: Fides.</li><li><strong>Secundum Mysterium:</strong> Ascensio Iesu in Caelum. Fructus Mysterii: Spes.</li><li><strong>Tertium Mysterium:</strong> Descensus Spiritus Sancti. Fructus Mysterii: Caritas Dei.</li><li><strong>Quartum Mysterium:</strong> Assumptio Beatae Mariae Virginis in Caelum. Fructus Mysterii: Gratia bonae mortis.</li><li><strong>Quintum Mysterium:</strong> Coronatio Beatae Mariae Virginis in Caelo. Fructus Mysterii: Fiducia in intercessione Mariae.</li></ol>`
            }
          }
        ],
    },
    logoUrl: 'https://congregatiomissionis.org/wp-content/uploads/2024/09/Logo-CM-tradicional-sin-fondo.png',
    headerTitle: { vi: 'Phụng Vụ Vinh Sơn', en: 'Vincentian Liturgy' },
    headerSubtitle: { vi: 'Nguồn tài liệu cho Tu sĩ và Giáo dân', en: 'Resources for Religious and Laity' },
    mainSections: [
      { id: 'prayers', title: { vi: 'Kinh Nguyện', en: 'Prayers' }, icon: 'fa-book-pray' }
    ],
    supportEmail: 'admin@example.com',
    sectionsConfig: SECTIONS_CONFIG,
    aboutContent: {
      title: { vi: 'Về Ứng Dụng', en: 'About The App' },
      p1: {
          vi: '<strong>Phụng Vụ Vinh Sơn</strong> là một ứng dụng web được thiết kế để cung cấp các bài đọc và tài liệu phụng vụ cho các ngày lễ trong lịch Vinh Sơn. Mục tiêu của chúng tôi là làm cho các nguồn tài liệu này dễ dàng truy cập cho các thành viên của Tu Hội Truyền Giáo (các cha Laza), Tu Hội Nữ Tử Bác Ái, và tất cả những ai quan tâm đến linh đạo Vinh Sơn.',
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

const App: React.FC = () => {
  // State initialization with localStorage fallback
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      let parsed = savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
      
      // Migration and validation
      if (!parsed.languages || parsed.languages.length === 0) {
        parsed.languages = DEFAULT_SETTINGS.languages;
      }
      // Migration for adding 'enabled' flag
      if (parsed.languages.some((l: any) => l.enabled === undefined)) {
        parsed.languages = parsed.languages.map((l: any) => ({ ...l, enabled: true }));
      }

      if (!parsed.defaultLanguage) {
        parsed.defaultLanguage = DEFAULT_SETTINGS.defaultLanguage;
      }
      if (!parsed.languages.some((l: LanguageConfig) => l.code === parsed.language)) {
        parsed.language = parsed.defaultLanguage;
      }

      if (parsed.prayers && !parsed.mainSectionContents) {
          parsed.mainSectionContents = { 'prayers': parsed.prayers };
          delete parsed.prayers;
      } else if (!parsed.mainSectionContents) {
          parsed.mainSectionContents = {};
      }

      if (parsed.mainSections) {
        for (const section of parsed.mainSections) {
          if (!parsed.mainSectionContents[section.id]) {
            parsed.mainSectionContents[section.id] = [];
          }
        }
      }
      if (!parsed.supportEmail) {
        parsed.supportEmail = DEFAULT_SETTINGS.supportEmail;
      }
      
      // Migration to remove color from feast types
      if (parsed.feastTypes && parsed.feastTypes.some((ft: any) => ft.color)) {
        parsed.feastTypes = parsed.feastTypes.map((ft: any) => ({ name: ft.name }));
      }
      
      if (!parsed.sectionsConfig) {
        parsed.sectionsConfig = DEFAULT_SETTINGS.sectionsConfig;
      }
      
      if (!parsed.aboutContent) {
        parsed.aboutContent = DEFAULT_SETTINGS.aboutContent;
      }


      return parsed;

    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
      return DEFAULT_SETTINGS;
    }
  });

  const [feasts, setFeasts] = useState<Feast[]>(() => {
    try {
        const savedFeasts = localStorage.getItem('feasts');
        return savedFeasts ? JSON.parse(savedFeasts) : initialFeasts;
    } catch (error) {
        console.error("Failed to parse feasts from localStorage", error);
        return initialFeasts;
    }
  });

  const [view, setView] = useState<View>('feastList');
  const [history, setHistory] = useState<({ view: View; feast?: Feast; sectionKey?: SectionKey, mainSectionId?: string, genericContent?: GenericContent })[]>([]);

  const [selectedFeast, setSelectedFeast] = useState<Feast | null>(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState<SectionKey | null>(null);
  const [selectedMainSectionId, setSelectedMainSectionId] = useState<string | null>(null);
  const [selectedGenericContent, setSelectedGenericContent] = useState<GenericContent | null>(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showEditFeast, setShowEditFeast] = useState(false);
  const [editingFeast, setEditingFeast] = useState<Partial<Feast> | null>(null);
  const [showEditSection, setShowEditSection] = useState(false);
  const [showEditGenericContentModal, setShowEditGenericContentModal] = useState(false);
  const [editingGenericContent, setEditingGenericContent] = useState<Partial<GenericContent> | null>(null);
  
  const getML = useCallback((textObj: MultilingualString | undefined) => {
    return getMLText(textObj, settings.language, settings.defaultLanguage);
  }, [settings.language, settings.defaultLanguage]);


  // Effects for persistence and theme application
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    document.body.className = `theme-${settings.theme}`;
    document.documentElement.lang = settings.language;
    setIsLoading(false);
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('feasts', JSON.stringify(feasts));
  }, [feasts]);

  const navigate = useCallback((newView: View, data: { feast?: Feast, sectionKey?: SectionKey, mainSectionId?: string, genericContent?: GenericContent } = {}) => {
      setHistory(prev => [...prev, { 
        view, 
        feast: selectedFeast || undefined, 
        sectionKey: selectedSectionKey || undefined, 
        mainSectionId: selectedMainSectionId || undefined,
        genericContent: selectedGenericContent || undefined,
      }]);
      setView(newView);
      if (data.feast !== undefined) setSelectedFeast(data.feast);
      if (data.sectionKey !== undefined) setSelectedSectionKey(data.sectionKey);
      if (data.mainSectionId !== undefined) setSelectedMainSectionId(data.mainSectionId);
      if (data.genericContent !== undefined) setSelectedGenericContent(data.genericContent);
      window.scrollTo(0, 0);
  }, [view, selectedFeast, selectedSectionKey, selectedMainSectionId, selectedGenericContent]);

  const handleGoBack = () => {
    // If already at the main list or no history exists, reset to the default state.
    if (view === 'feastList' || history.length === 0) {
        setView('feastList');
        setSelectedFeast(null);
        setSelectedSectionKey(null);
        setSelectedMainSectionId(null);
        setSelectedGenericContent(null);
        setHistory([]);
        window.scrollTo(0, 0);
        return;
    }

    // Get the state to return to from the end of the history array.
    const previousState = history[history.length - 1];
    
    // Create a new history array without the last element.
    // Using slice() is crucial for immutability, preventing direct state mutation.
    const newHistory = history.slice(0, history.length - 1);

    // Restore the view and selected items from the previous state.
    setView(previousState.view);
    setSelectedFeast(previousState.feast || null);
    setSelectedSectionKey(previousState.sectionKey || null);
    setSelectedMainSectionId(previousState.mainSectionId || null);
    setSelectedGenericContent(previousState.genericContent || null);
    
    // Update the history state with the new, shorter array.
    setHistory(newHistory);

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
  
  // Handlers for navigation
  const handleSelectFeast = (feast: Feast) => navigate('feastDetail', { feast });
  const handleSelectSection = (sectionKey: SectionKey) => navigate('sectionView', { feast: selectedFeast!, sectionKey: sectionKey });
  const handleSelectMainSection = (sectionId: string) => navigate('genericList', { mainSectionId: sectionId });
  const handleSelectGenericContent = (item: GenericContent) => navigate('genericDetail', { genericContent: item });
  

  const handleLanguageChange = (langCode: string) => setSettings(s => ({ ...s, language: langCode }));
  const handleThemeChange = (theme: Theme) => setSettings(s => ({ ...s, theme }));
  const handleFontSizeChange = (newSize: number) => setSettings(s => ({ ...s, fontSize: newSize }));
  
  const handleLoginAttempt = (password: string) => {
    if (password === settings.adminPassword) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      handleTitleClick(); // Trở về trang chủ sau khi đăng nhập thành công
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    handleTitleClick(); // Trở về trang chủ khi đăng xuất
  };
  
  const handleSaveSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(s => {
      const combinedSettings = { ...s, ...newSettings };
  
      // Sync mainSectionContents with the new mainSections list
      if (newSettings.mainSections) {
        const newContents = { ...combinedSettings.mainSectionContents };
        const newSectionIds = new Set(newSettings.mainSections.map(sec => sec.id));
        let hasChanges = false;
        
        // Remove contents for sections that no longer exist
        for (const sectionId in newContents) {
            if (!newSectionIds.has(sectionId)) {
                delete newContents[sectionId];
                hasChanges = true;
            }
        }
        
        // Add placeholders for newly added sections
        newSettings.mainSections.forEach(section => {
          if (!newContents.hasOwnProperty(section.id)) {
            newContents[section.id] = [];
            hasChanges = true;
          }
        });
  
        if (hasChanges) {
          combinedSettings.mainSectionContents = newContents;
        }
      }
      
      return combinedSettings;
    });
    setShowAdminPanel(false);
  };

  const handleAddNewFeast = () => {
    setEditingFeast({});
    setShowEditFeast(true);
  };

  const handleSaveFeast = (feastToSave: Feast) => {
    const feastExists = feasts.some(f => f.id === feastToSave.id);
    if (feastExists) {
      setFeasts(feasts.map(f => f.id === feastToSave.id ? feastToSave : f));
      if (selectedFeast?.id === feastToSave.id) {
          setSelectedFeast(feastToSave);
      }
    } else {
      setFeasts([...feasts, feastToSave].sort((a,b) => a.date.localeCompare(b.date)));
    }
    setShowEditFeast(false);
    setEditingFeast(null);
  };

  const handleDeleteFeast = () => {
    if (!selectedFeast) return;
    const feastTitle = getML(selectedFeast.title)
    const confirmMsg = getML({
      vi: `Bạn có chắc muốn xóa "${feastTitle}" không?`,
      en: `Are you sure you want to delete "${feastTitle}"?`
    });

    if (window.confirm(confirmMsg)) {
        setFeasts(feasts.filter(f => f.id !== selectedFeast.id));
        handleTitleClick(); // Go back to home
    }
  };

  const handleSaveSection = (newContent: MultilingualString) => {
    if (!selectedFeast || !selectedSectionKey) return;
    const updatedFeast = {
        ...selectedFeast,
        sections: {
            ...selectedFeast.sections,
            [selectedSectionKey]: newContent,
        }
    };
    setSelectedFeast(updatedFeast);
    setFeasts(feasts.map(f => f.id === updatedFeast.id ? updatedFeast : f));
    setShowEditSection(false);
  };
  
  const handleAddNewGenericContent = () => {
    if (!selectedMainSectionId) return;
    setEditingGenericContent({});
    setShowEditGenericContentModal(true);
  };

  const handleSaveGenericContent = (savedContent: GenericContent) => {
    if (!selectedMainSectionId) return;
    const currentContentList = settings.mainSectionContents[selectedMainSectionId] || [];
    const contentExists = currentContentList.some(p => p.id === savedContent.id);
    let updatedContent;
    if (contentExists) {
      updatedContent = currentContentList.map(p => (p.id === savedContent.id ? savedContent : p));
    } else {
      updatedContent = [...currentContentList, savedContent];
    }
    setSettings(s => ({ 
      ...s, 
      mainSectionContents: {
        ...s.mainSectionContents,
        [selectedMainSectionId]: updatedContent,
      } 
    }));
    setShowEditGenericContentModal(false);
    setEditingGenericContent(null);
  };

  const handleDeleteGenericContent = () => {
    if (!selectedGenericContent || !selectedMainSectionId) return;
    const itemTitle = getML(selectedGenericContent.title);
    const confirmMsg = getML({
        vi: `Bạn có chắc muốn xóa mục "${itemTitle}" không?`,
        en: `Are you sure you want to delete the item "${itemTitle}"?`,
    });

    if (window.confirm(confirmMsg)) {
        const updatedContent = settings.mainSectionContents[selectedMainSectionId].filter(p => p.id !== selectedGenericContent.id);
        
        // Manually navigate back instead of using the generic handleGoBack,
        // to ensure all state is updated in a single, clean render pass.
        const previousState = history.length > 0 ? history[history.length - 1] : null;
        const newHistory = history.slice(0, -1);

        setSettings(s => ({
            ...s,
            mainSectionContents: {
                ...s.mainSectionContents,
                [selectedMainSectionId]: updatedContent
            }
        }));
        setHistory(newHistory);
        setView(previousState ? previousState.view : 'feastList'); // Default to feastList
        setSelectedGenericContent(null); // Clear the selected item
        window.scrollTo(0, 0);
    }
};

  const getSectionTitle = (sectionKey: SectionKey): MultilingualString => {
      const config = settings.sectionsConfig.find(c => c.key === sectionKey);
      return config ? config.title : { vi: 'Không rõ', en: 'Unknown' };
  };

  const sortedFeasts = useMemo(() => {
    return [...feasts].sort((a, b) => {
        const dateA = a.date.replace('-', '');
        const dateB = b.date.replace('-', '');
        return dateA.localeCompare(dateB);
    });
  }, [feasts]);
  
  const currentSectionIndex = useMemo(() => {
    if (!selectedFeast || !selectedSectionKey) return -1;
    return settings.sectionsConfig.findIndex(s => s.key === selectedSectionKey);
  }, [selectedFeast, selectedSectionKey, settings.sectionsConfig]);
  
  const currentGenericContentIndex = useMemo(() => {
    if (!selectedGenericContent || !selectedMainSectionId) return -1;
    const contentList = settings.mainSectionContents[selectedMainSectionId] || [];
    return contentList.findIndex(p => p.id === selectedGenericContent.id);
  }, [selectedGenericContent, selectedMainSectionId, settings.mainSectionContents]);
  
  const handleNavigateSection = (direction: 'prev' | 'next') => {
      if (currentSectionIndex === -1 || !selectedFeast) return;
      const step = direction === 'prev' ? -1 : 1;
      let nextIndex = currentSectionIndex + step;
      while (nextIndex >= 0 && nextIndex < settings.sectionsConfig.length) {
          const nextSectionKey = settings.sectionsConfig[nextIndex].key;
          const hasContent = selectedFeast.sections[nextSectionKey] && 
                             (getMLText(selectedFeast.sections[nextSectionKey], settings.language, settings.defaultLanguage).trim() !== '');
          if (hasContent) {
              setSelectedSectionKey(nextSectionKey);
              return;
          }
          nextIndex += step;
      }
  };

  const handleNavigateGenericContent = (direction: 'prev' | 'next') => {
    if (currentGenericContentIndex === -1 || !selectedMainSectionId) return;
    const contentList = settings.mainSectionContents[selectedMainSectionId] || [];
    const nextIndex = direction === 'prev' ? currentGenericContentIndex - 1 : currentGenericContentIndex + 1;
    if (nextIndex >= 0 && nextIndex < contentList.length) {
        setSelectedGenericContent(contentList[nextIndex]);
    }
  };

  const canNavigateSection = (direction: 'prev' | 'next'): boolean => {
      if (currentSectionIndex === -1 || !selectedFeast) return false;
      const step = direction === 'prev' ? -1 : 1;
      let nextIndex = currentSectionIndex + step;
      while(nextIndex >= 0 && nextIndex < settings.sectionsConfig.length) {
          const key = settings.sectionsConfig[nextIndex].key;
          const hasContent = selectedFeast.sections[key] && (getMLText(selectedFeast.sections[key], settings.language, settings.defaultLanguage).trim() !== '');
          if(hasContent) return true;
          nextIndex += step;
      }
      return false;
  };
  
  const canNavigateGenericContent = (direction: 'prev' | 'next'): boolean => {
      if (currentGenericContentIndex === -1 || !selectedMainSectionId) return false;
      const contentList = settings.mainSectionContents[selectedMainSectionId] || [];
      const nextIndex = direction === 'prev' ? currentGenericContentIndex - 1 : currentGenericContentIndex + 1;
      return nextIndex >= 0 && nextIndex < contentList.length;
  };

  if (isLoading) {
    return <Spinner />;
  }

  const renderContent = () => {
    switch (view) {
      case 'feastDetail':
        return selectedFeast && <FeastDetail 
          feast={selectedFeast} 
          onSelectSection={handleSelectSection}
          isAdmin={isAdmin}
          onEditFeast={() => { setEditingFeast(selectedFeast); setShowEditFeast(true); }}
          onDeleteFeast={handleDeleteFeast}
          getML={getML}
          getSectionTitle={getSectionTitle}
          sectionsConfig={settings.sectionsConfig}
        />;
      case 'sectionView':
        return selectedFeast && selectedSectionKey && <SectionView
            feastTitle={getML(selectedFeast.title)}
            sectionTitle={getML(getSectionTitle(selectedSectionKey))}
            content={getML(selectedFeast.sections[selectedSectionKey]) || ''}
            isAdmin={isAdmin}
            onEdit={() => setShowEditSection(true)}
            getML={getML}
            fontSize={settings.fontSize}
            onFontSizeChange={handleFontSizeChange}
            onNavigateSection={handleNavigateSection}
            canNavigatePrev={canNavigateSection('prev')}
            canNavigateNext={canNavigateSection('next')}
        />;
      case 'genericList':
        return selectedMainSectionId && <GenericContentList
          key={`generic-list-${(settings.mainSectionContents[selectedMainSectionId] || []).length}`}
          items={settings.mainSectionContents[selectedMainSectionId] || []} 
          onSelectItem={handleSelectGenericContent} 
          getML={getML}
          isAdmin={isAdmin}
          onAddNew={handleAddNewGenericContent}
          title={settings.mainSections.find(s => s.id === selectedMainSectionId)?.title || {vi: 'Danh Sách', en: 'List'}}
        />;
      case 'genericDetail':
        return selectedGenericContent && <GenericContentDetail
          item={selectedGenericContent}
          isAdmin={isAdmin}
          onEdit={() => {
            setEditingGenericContent(selectedGenericContent);
            setShowEditGenericContentModal(true);
          }}
          onDelete={handleDeleteGenericContent}
          getML={getML}
          fontSize={settings.fontSize}
          onFontSizeChange={handleFontSizeChange}
          onNavigateItem={handleNavigateGenericContent}
          canNavigatePrev={canNavigateGenericContent('prev')}
          canNavigateNext={canNavigateGenericContent('next')}
          />;
      case 'about':
        return <AboutPage 
            onGoBack={handleGoBack} 
            language={settings.language} 
            defaultLanguage={settings.defaultLanguage}
            content={settings.aboutContent}
        />;
      case 'feastList':
      default:
        return <FeastList
          key={`feast-list-${sortedFeasts.length}`}
          feasts={sortedFeasts}
          onSelectFeast={handleSelectFeast}
          feastTypes={settings.feastTypes}
          getML={getML}
          mainSections={settings.mainSections}
          onSelectMainSection={handleSelectMainSection}
          isAdmin={isAdmin}
          onAddNewFeast={handleAddNewFeast}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans flex flex-col items-center">
      <Header
        onGoBack={handleGoBack}
        showBackButton={view !== 'feastList'}
        currentLanguage={settings.language}
        languages={settings.languages.filter(l => l.enabled)}
        defaultLanguage={settings.defaultLanguage}
        onLanguageChange={handleLanguageChange}
        onThemeChange={handleThemeChange}
        currentTheme={settings.theme}
        onAdminClick={() => isAdmin ? setShowAdminPanel(true) : setShowAdminLogin(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        logoUrl={settings.logoUrl}
        title={settings.headerTitle}
        subtitle={settings.headerSubtitle}
        onTitleClick={handleTitleClick}
        onAboutClick={() => navigate('about')}
      />
      <main className="w-full max-w-4xl mx-auto p-4 flex-grow container">
        {renderContent()}
      </main>
      <Footer content={getML(settings.footerContent)} />
      <ScrollToTopButton />

      {/* Modals */}
      {showAdminLogin && <AdminLogin onClose={() => setShowAdminLogin(false)} onLoginAttempt={handleLoginAttempt} getML={getML} supportEmail={settings.supportEmail} />}
      {isAdmin && showAdminPanel && <AdminPanelModal onClose={() => setShowAdminPanel(false)} onSave={handleSaveSettings} currentSettings={settings} />}
      {isAdmin && showEditFeast && <EditFeastModal feast={editingFeast} onClose={() => { setShowEditFeast(false); setEditingFeast(null); }} onSave={handleSaveFeast} feastTypes={settings.feastTypes} languages={settings.languages} sectionsConfig={settings.sectionsConfig} />}
      {isAdmin && showEditSection && selectedFeast && selectedSectionKey && (
        <EditSectionModal 
          title={getSectionTitle(selectedSectionKey)}
          content={selectedFeast.sections[selectedSectionKey]!}
          onClose={() => setShowEditSection(false)}
          onSave={handleSaveSection}
          languages={settings.languages}
        />
      )}
      {isAdmin && showEditGenericContentModal && (
        <EditGenericContentModal 
            item={editingGenericContent} 
            onClose={() => { setShowEditGenericContentModal(false); setEditingGenericContent(null); }} 
            onSave={handleSaveGenericContent} 
            title={getML(settings.mainSections.find(s => s.id === selectedMainSectionId)?.title) || ''}
            languages={settings.languages}
        />
      )}
    </div>
  );
};

export default App;