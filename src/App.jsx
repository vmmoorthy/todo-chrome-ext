import { useEffect, useState } from 'react';
import './App.css';
import { connect, get, insert } from 'storage_engine';
import Notification from './component/Notification';


let DB = null;
console.log(DB);

function App() {

  const [todo, setTodo] = useState([]);
  // console.log(dj, );
  useEffect(() => {

    //get db object
    (async function () {
      try {
        DB = await connect({
          dbName: 'todo',
          dbVersion: 1,
          store: [{
            storeName: 'list',
            index: [{
              indexName: 'id',
              keyPath: 'id',
              options: {
                unique: true,
                // multiEntry: false
              }
            }]
          }]
        });
        console.log(DB);
        console.log(await insert(DB, "list", { title: "test"+Math.random(), created: new Date(), completed: false }));
        console.log(await get(DB, "list", 6));
      } catch (error) {
        alert(error);
        console.log(error);
      }

    }
    )();

    setTodo([
      {
        "catagory": "Upcomming",
        list: [{
          "catID": 1,
          "id": 1,
          "todo": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "desc": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "catID": 1,
          "id": 2,
          "todo": "qui est esse",
          "desc": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "catID": 1,
          "id": 3,
          "todo": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "desc": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        },
        {
          "catID": 1,
          "id": 4,
          "todo": "eum et est occaecati",
          "desc": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
        },
        {
          "catID": 1,
          "id": 5,
          "todo": "nesciunt quas odio",
          "desc": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
        },
        {
          "catID": 1,
          "id": 6,
          "todo": "dolorem eum magni eos aperiam quia",
          "desc": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
        },
        {
          "catID": 1,
          "id": 7,
          "todo": "magnam facilis autem",
          "desc": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
        },
        {
          "catID": 1,
          "id": 8,
          "todo": "dolorem dolore est ipsam",
          "desc": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
        },
        {
          "catID": 1,
          "id": 9,
          "todo": "nesciunt iure omnis dolorem tempora et accusantium",
          "desc": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
        },
        {
          "catID": 1,
          "id": 10,
          "todo": "optio molestias id quia eum",
          "desc": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
        },]
      },
      {
        catagory: "Progress",
        list: [{
          "catID": 2,
          "id": 11,
          "todo": "et ea vero quia laudantium autem",
          "desc": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
        },
        {
          "catID": 2,
          "id": 12,
          "todo": "in quibusdam tempore odit est dolorem",
          "desc": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
        },
        {
          "catID": 2,
          "id": 13,
          "todo": "dolorum ut in voluptas mollitia et saepe quo animi",
          "desc": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
        },
        {
          "catID": 2,
          "id": 14,
          "todo": "voluptatem eligendi optio",
          "desc": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
        },
        {
          "catID": 2,
          "id": 15,
          "todo": "eveniet quod temporibus",
          "desc": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
        },
        {
          "catID": 2,
          "id": 16,
          "todo": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
          "desc": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
        },
        {
          "catID": 2,
          "id": 17,
          "todo": "fugit voluptas sed molestias voluptatem provident",
          "desc": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
        },
        {
          "catID": 2,
          "id": 18,
          "todo": "voluptate et itaque vero tempora molestiae",
          "desc": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
        },
        {
          "catID": 2,
          "id": 19,
          "todo": "adipisci placeat illum aut reiciendis qui",
          "desc": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
        },
        {
          "catID": 2,
          "id": 20,
          "todo": "doloribus ad provident suscipit at",
          "desc": "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
        },]
      },
      {
        catagory: "Upcomming", list: [{
          "catID": 3,
          "id": 21,
          "todo": "asperiores ea ipsam voluptatibus modi minima quia sint",
          "desc": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
        },
        {
          "catID": 3,
          "id": 22,
          "todo": "dolor sint quo a velit explicabo quia nam",
          "desc": "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"
        },
        {
          "catID": 3,
          "id": 23,
          "todo": "maxime id vitae nihil numquam",
          "desc": "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis"
        },
        {
          "catID": 3,
          "id": 24,
          "todo": "autem hic labore sunt dolores incidunt",
          "desc": "enim et ex nulla\nomnis voluptas quia qui\nvoluptatem consequatur numquam aliquam sunt\ntotam recusandae id dignissimos aut sed asperiores deserunt"
        },
        {
          "catID": 3,
          "id": 25,
          "todo": "rem alias distinctio quo quis",
          "desc": "ullam consequatur ut\nomnis quis sit vel consequuntur\nipsa eligendi ipsum molestiae et omnis error nostrum\nmolestiae illo tempore quia et distinctio"
        },
        {
          "catID": 3,
          "id": 26,
          "todo": "est et quae odit qui non",
          "desc": "similique esse doloribus nihil accusamus\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\nperspiciatis cum ut laudantium\nomnis aut molestiae vel vero"
        },
        {
          "catID": 3,
          "id": 27,
          "todo": "quasi id et eos tenetur aut quo autem",
          "desc": "eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"
        },
        {
          "catID": 3,
          "id": 28,
          "todo": "delectus ullam et corporis nulla voluptas sequi",
          "desc": "non et quaerat ex quae ad maiores\nmaiores recusandae totam aut blanditiis mollitia quas illo\nut voluptatibus voluptatem\nsimilique nostrum eum"
        },
        {
          "catID": 3,
          "id": 29,
          "todo": "iusto eius quod necessitatibus culpa ea",
          "desc": "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores"
        },
        {
          "catID": 3,
          "id": 30,
          "todo": "a quo magni similique perferendis",
          "desc": "alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia"
        },]
      },
      {
        catagory: "for approvel", list: [{
          "catID": 4,
          "id": 31,
          "todo": "ullam ut quidem id aut vel consequuntur",
          "desc": "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"
        },
        {
          "catID": 4,
          "id": 32,
          "todo": "doloremque illum aliquid sunt",
          "desc": "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime"
        },
        {
          "catID": 4,
          "id": 33,
          "todo": "qui explicabo molestiae dolorem",
          "desc": "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod"
        },
        {
          "catID": 4,
          "id": 34,
          "todo": "magnam ut rerum iure",
          "desc": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\ntotam pariatur in\nnemo voluptatem voluptatem autem magni tempora minima in\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"
        },
        {
          "catID": 4,
          "id": 35,
          "todo": "id nihil consequatur molestias animi provident",
          "desc": "nisi error delectus possimus ut eligendi vitae\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\nmodi ducimus quo illum voluptas eligendi\net nobis quia fugit"
        },
        {
          "catID": 4,
          "id": 36,
          "todo": "fuga nam accusamus voluptas reiciendis itaque",
          "desc": "ad mollitia et omnis minus architecto odit\nvoluptas doloremque maxime aut non ipsa qui alias veniam\nblanditiis culpa aut quia nihil cumque facere et occaecati\nqui aspernatur quia eaque ut aperiam inventore"
        },
        {
          "catID": 4,
          "id": 37,
          "todo": "provident vel ut sit ratione est",
          "desc": "debitis et eaque non officia sed nesciunt pariatur vel\nvoluptatem iste vero et ea\nnumquam aut expedita ipsum nulla in\nvoluptates omnis consequatur aut enim officiis in quam qui"
        },
        {
          "catID": 4,
          "id": 38,
          "todo": "explicabo et eos deleniti nostrum ab id repellendus",
          "desc": "animi esse sit aut sit nesciunt assumenda eum voluptas\nquia voluptatibus provident quia necessitatibus ea\nrerum repudiandae quia voluptatem delectus fugit aut id quia\nratione optio eos iusto veniam iure"
        },
        {
          "catID": 4,
          "id": 39,
          "todo": "eos dolorem iste accusantium est eaque quam",
          "desc": "corporis rerum ducimus vel eum accusantium\nmaxime aspernatur a porro possimus iste omnis\nest in deleniti asperiores fuga aut\nvoluptas sapiente vel dolore minus voluptatem incidunt ex"
        },
        {
          "catID": 4,
          "id": 40,
          "todo": "enim quo cumque",
          "desc": "ut voluptatum aliquid illo tenetur nemo sequi quo facilis\nipsum rem optio mollitia quas\nvoluptatem eum voluptas qui\nunde omnis voluptatem iure quasi maxime voluptas nam"
        },]
      },
      {
        catagory: "on design", list: [{
          "catID": 5,
          "id": 41,
          "todo": "non est facere",
          "desc": "molestias id nostrum\nexcepturi molestiae dolore omnis repellendus quaerat saepe\nconsectetur iste quaerat tenetur asperiores accusamus ex ut\nnam quidem est ducimus sunt debitis saepe"
        },
        {
          "catID": 5,
          "id": 42,
          "todo": "commodi ullam sint et excepturi error explicabo praesentium voluptas",
          "desc": "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut"
        },
        {
          "catID": 5,
          "id": 43,
          "todo": "eligendi iste nostrum consequuntur adipisci praesentium sit beatae perferendis",
          "desc": "similique fugit est\nillum et dolorum harum et voluptate eaque quidem\nexercitationem quos nam commodi possimus cum odio nihil nulla\ndolorum exercitationem magnam ex et a et distinctio debitis"
        },
        {
          "catID": 5,
          "id": 44,
          "todo": "optio dolor molestias sit",
          "desc": "temporibus est consectetur dolore\net libero debitis vel velit laboriosam quia\nipsum quibusdam qui itaque fuga rem aut\nea et iure quam sed maxime ut distinctio quae"
        },
        {
          "catID": 5,
          "id": 45,
          "todo": "ut numquam possimus omnis eius suscipit laudantium iure",
          "desc": "est natus reiciendis nihil possimus aut provident\nex et dolor\nrepellat pariatur est\nnobis rerum repellendus dolorem autem"
        },
        {
          "catID": 5,
          "id": 46,
          "todo": "aut quo modi neque nostrum ducimus",
          "desc": "voluptatem quisquam iste\nvoluptatibus natus officiis facilis dolorem\nquis quas ipsam\nvel et voluptatum in aliquid"
        },
        {
          "catID": 5,
          "id": 47,
          "todo": "quibusdam cumque rem aut deserunt",
          "desc": "voluptatem assumenda ut qui ut cupiditate aut impedit veniam\noccaecati nemo illum voluptatem laudantium\nmolestiae beatae rerum ea iure soluta nostrum\neligendi et voluptate"
        },
        {
          "catID": 5,
          "id": 48,
          "todo": "ut voluptatem illum ea doloribus itaque eos",
          "desc": "voluptates quo voluptatem facilis iure occaecati\nvel assumenda rerum officia et\nillum perspiciatis ab deleniti\nlaudantium repellat ad ut et autem reprehenderit"
        },
        {
          "catID": 5,
          "id": 49,
          "todo": "laborum non sunt aut ut assumenda perspiciatis voluptas",
          "desc": "inventore ab sint\nnatus fugit id nulla sequi architecto nihil quaerat\neos tenetur in in eum veritatis non\nquibusdam officiis aspernatur cumque aut commodi aut"
        },
        {
          "catID": 5,
          "id": 50,
          "todo": "repellendus qui recusandae incidunt voluptates tenetur qui omnis exercitationem",
          "desc": "error suscipit maxime adipisci consequuntur recusandae\nvoluptas eligendi et est et voluptates\nquia distinctio ab amet quaerat molestiae et vitae\nadipisci impedit sequi nesciunt quis consectetur"
        },]
      },
      {
        catagory: "on developing", list: [{
          "catID": 6,
          "id": 51,
          "todo": "soluta aliquam aperiam consequatur illo quis voluptas",
          "desc": "sunt dolores aut doloribus\ndolore doloribus voluptates tempora et\ndoloremque et quo\ncum asperiores sit consectetur dolorem"
        },
        {
          "catID": 6,
          "id": 52,
          "todo": "qui enim et consequuntur quia animi quis voluptate quibusdam",
          "desc": "iusto est quibusdam fuga quas quaerat molestias\na enim ut sit accusamus enim\ntemporibus iusto accusantium provident architecto\nsoluta esse reprehenderit qui laborum"
        },
        {
          "catID": 6,
          "id": 53,
          "todo": "ut quo aut ducimus alias",
          "desc": "minima harum praesentium eum rerum illo dolore\nquasi exercitationem rerum nam\nporro quis neque quo\nconsequatur minus dolor quidem veritatis sunt non explicabo similique"
        },
        {
          "catID": 6,
          "id": 54,
          "todo": "sit asperiores ipsam eveniet odio non quia",
          "desc": "totam corporis dignissimos\nvitae dolorem ut occaecati accusamus\nex velit deserunt\net exercitationem vero incidunt corrupti mollitia"
        },
        {
          "catID": 6,
          "id": 55,
          "todo": "sit vel voluptatem et non libero",
          "desc": "debitis excepturi ea perferendis harum libero optio\neos accusamus cum fuga ut sapiente repudiandae\net ut incidunt omnis molestiae\nnihil ut eum odit"
        },
        {
          "catID": 6,
          "id": 56,
          "todo": "qui et at rerum necessitatibus",
          "desc": "aut est omnis dolores\nneque rerum quod ea rerum velit pariatur beatae excepturi\net provident voluptas corrupti\ncorporis harum reprehenderit dolores eligendi"
        },
        {
          "catID": 6,
          "id": 57,
          "todo": "sed ab est est",
          "desc": "at pariatur consequuntur earum quidem\nquo est laudantium soluta voluptatem\nqui ullam et est\net cum voluptas voluptatum repellat est"
        },
        {
          "catID": 6,
          "id": 58,
          "todo": "voluptatum itaque dolores nisi et quasi",
          "desc": "veniam voluptatum quae adipisci id\net id quia eos ad et dolorem\naliquam quo nisi sunt eos impedit error\nad similique veniam"
        },
        {
          "catID": 6,
          "id": 59,
          "todo": "qui commodi dolor at maiores et quis id accusantium",
          "desc": "perspiciatis et quam ea autem temporibus non voluptatibus qui\nbeatae a earum officia nesciunt dolores suscipit voluptas et\nanimi doloribus cum rerum quas et magni\net hic ut ut commodi expedita sunt"
        },
        {
          "catID": 6,
          "id": 60,
          "todo": "consequatur placeat omnis quisquam quia reprehenderit fugit veritatis facere",
          "desc": "asperiores sunt ab assumenda cumque modi velit\nqui esse omnis\nvoluptate et fuga perferendis voluptas\nillo ratione amet aut et omnis"
        },]
      },
      {
        catagory: "on testing", list: [{
          "catID": 7,
          "id": 61,
          "todo": "voluptatem doloribus consectetur est ut ducimus",
          "desc": "ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit"
        },
        {
          "catID": 7,
          "id": 62,
          "todo": "beatae enim quia vel",
          "desc": "enim aspernatur illo distinctio quae praesentium\nbeatae alias amet delectus qui voluptate distinctio\nodit sint accusantium autem omnis\nquo molestiae omnis ea eveniet optio"
        },
        {
          "catID": 7,
          "id": 63,
          "todo": "voluptas blanditiis repellendus animi ducimus error sapiente et suscipit",
          "desc": "enim adipisci aspernatur nemo\nnumquam omnis facere dolorem dolor ex quis temporibus incidunt\nab delectus culpa quo reprehenderit blanditiis asperiores\naccusantium ut quam in voluptatibus voluptas ipsam dicta"
        },
        {
          "catID": 7,
          "id": 64,
          "todo": "et fugit quas eum in in aperiam quod",
          "desc": "id velit blanditiis\neum ea voluptatem\nmolestiae sint occaecati est eos perspiciatis\nincidunt a error provident eaque aut aut qui"
        },
        {
          "catID": 7,
          "id": 65,
          "todo": "consequatur id enim sunt et et",
          "desc": "voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur"
        },
        {
          "catID": 7,
          "id": 66,
          "todo": "repudiandae ea animi iusto",
          "desc": "officia veritatis tenetur vero qui itaque\nsint non ratione\nsed et ut asperiores iusto eos molestiae nostrum\nveritatis quibusdam et nemo iusto saepe"
        },
        {
          "catID": 7,
          "id": 67,
          "todo": "aliquid eos sed fuga est maxime repellendus",
          "desc": "reprehenderit id nostrum\nvoluptas doloremque pariatur sint et accusantium quia quod aspernatur\net fugiat amet\nnon sapiente et consequatur necessitatibus molestiae"
        },
        {
          "catID": 7,
          "id": 68,
          "todo": "odio quis facere architecto reiciendis optio",
          "desc": "magnam molestiae perferendis quisquam\nqui cum reiciendis\nquaerat animi amet hic inventore\nea quia deleniti quidem saepe porro velit"
        },
        {
          "catID": 7,
          "id": 69,
          "todo": "fugiat quod pariatur odit minima",
          "desc": "officiis error culpa consequatur modi asperiores et\ndolorum assumenda voluptas et vel qui aut vel rerum\nvoluptatum quisquam perspiciatis quia rerum consequatur totam quas\nsequi commodi repudiandae asperiores et saepe a"
        },
        {
          "catID": 7,
          "id": 70,
          "todo": "voluptatem laborum magni",
          "desc": "sunt repellendus quae\nest asperiores aut deleniti esse accusamus repellendus quia aut\nquia dolorem unde\neum tempora esse dolore"
        },]
      },
      {
        catagory: "for client approvel", list: [{
          "catID": 8,
          "id": 71,
          "todo": "et iusto veniam et illum aut fuga",
          "desc": "occaecati a doloribus\niste saepe consectetur placeat eum voluptate dolorem et\nqui quo quia voluptas\nrerum ut id enim velit est perferendis"
        },
        {
          "catID": 8,
          "id": 72,
          "todo": "sint hic doloribus consequatur eos non id",
          "desc": "quam occaecati qui deleniti consectetur\nconsequatur aut facere quas exercitationem aliquam hic voluptas\nneque id sunt ut aut accusamus\nsunt consectetur expedita inventore velit"
        },
        {
          "catID": 8,
          "id": 73,
          "todo": "consequuntur deleniti eos quia temporibus ab aliquid at",
          "desc": "voluptatem cumque tenetur consequatur expedita ipsum nemo quia explicabo\naut eum minima consequatur\ntempore cumque quae est et\net in consequuntur voluptatem voluptates aut"
        },
        {
          "catID": 8,
          "id": 74,
          "todo": "enim unde ratione doloribus quas enim ut sit sapiente",
          "desc": "odit qui et et necessitatibus sint veniam\nmollitia amet doloremque molestiae commodi similique magnam et quam\nblanditiis est itaque\nquo et tenetur ratione occaecati molestiae tempora"
        },
        {
          "catID": 8,
          "id": 75,
          "todo": "dignissimos eum dolor ut enim et delectus in",
          "desc": "commodi non non omnis et voluptas sit\nautem aut nobis magnam et sapiente voluptatem\net laborum repellat qui delectus facilis temporibus\nrerum amet et nemo voluptate expedita adipisci error dolorem"
        },
        {
          "catID": 8,
          "id": 76,
          "todo": "doloremque officiis ad et non perferendis",
          "desc": "ut animi facere\ntotam iusto tempore\nmolestiae eum aut et dolorem aperiam\nquaerat recusandae totam odio"
        },
        {
          "catID": 8,
          "id": 77,
          "todo": "necessitatibus quasi exercitationem odio",
          "desc": "modi ut in nulla repudiandae dolorum nostrum eos\naut consequatur omnis\nut incidunt est omnis iste et quam\nvoluptates sapiente aliquam asperiores nobis amet corrupti repudiandae provident"
        },
        {
          "catID": 8,
          "id": 78,
          "todo": "quam voluptatibus rerum veritatis",
          "desc": "nobis facilis odit tempore cupiditate quia\nassumenda doloribus rerum qui ea\nillum et qui totam\naut veniam repellendus"
        },
        {
          "catID": 8,
          "id": 79,
          "todo": "pariatur consequatur quia magnam autem omnis non amet",
          "desc": "libero accusantium et et facere incidunt sit dolorem\nnon excepturi qui quia sed laudantium\nquisquam molestiae ducimus est\nofficiis esse molestiae iste et quos"
        },
        {
          "catID": 8,
          "id": 80,
          "todo": "labore in ex et explicabo corporis aut quas",
          "desc": "ex quod dolorem ea eum iure qui provident amet\nquia qui facere excepturi et repudiandae\nasperiores molestias provident\nminus incidunt vero fugit rerum sint sunt excepturi provident"
        },]
      },
      {
        catagory: "on client testing", list: [{
          "catID": 9,
          "id": 81,
          "todo": "tempora rem veritatis voluptas quo dolores vero",
          "desc": "facere qui nesciunt est voluptatum voluptatem nisi\nsequi eligendi necessitatibus ea at rerum itaque\nharum non ratione velit laboriosam quis consequuntur\nex officiis minima doloremque voluptas ut aut"
        },
        {
          "catID": 9,
          "id": 82,
          "todo": "laudantium voluptate suscipit sunt enim enim",
          "desc": "ut libero sit aut totam inventore sunt\nporro sint qui sunt molestiae\nconsequatur cupiditate qui iste ducimus adipisci\ndolor enim assumenda soluta laboriosam amet iste delectus hic"
        },
        {
          "catID": 9,
          "id": 83,
          "todo": "odit et voluptates doloribus alias odio et",
          "desc": "est molestiae facilis quis tempora numquam nihil qui\nvoluptate sapiente consequatur est qui\nnecessitatibus autem aut ipsa aperiam modi dolore numquam\nreprehenderit eius rem quibusdam"
        },
        {
          "catID": 9,
          "id": 84,
          "todo": "optio ipsam molestias necessitatibus occaecati facilis veritatis dolores aut",
          "desc": "sint molestiae magni a et quos\neaque et quasi\nut rerum debitis similique veniam\nrecusandae dignissimos dolor incidunt consequatur odio"
        },
        {
          "catID": 9,
          "id": 85,
          "todo": "dolore veritatis porro provident adipisci blanditiis et sunt",
          "desc": "similique sed nisi voluptas iusto omnis\nmollitia et quo\nassumenda suscipit officia magnam sint sed tempora\nenim provident pariatur praesentium atque animi amet ratione"
        },
        {
          "catID": 9,
          "id": 86,
          "todo": "placeat quia et porro iste",
          "desc": "quasi excepturi consequatur iste autem temporibus sed molestiae beatae\net quaerat et esse ut\nvoluptatem occaecati et vel explicabo autem\nasperiores pariatur deserunt optio"
        },
        {
          "catID": 9,
          "id": 87,
          "todo": "nostrum quis quasi placeat",
          "desc": "eos et molestiae\nnesciunt ut a\ndolores perspiciatis repellendus repellat aliquid\nmagnam sint rem ipsum est"
        },
        {
          "catID": 9,
          "id": 88,
          "todo": "sapiente omnis fugit eos",
          "desc": "consequatur omnis est praesentium\nducimus non iste\nneque hic deserunt\nvoluptatibus veniam cum et rerum sed"
        },
        {
          "catID": 9,
          "id": 89,
          "todo": "sint soluta et vel magnam aut ut sed qui",
          "desc": "repellat aut aperiam totam temporibus autem et\narchitecto magnam ut\nconsequatur qui cupiditate rerum quia soluta dignissimos nihil iure\ntempore quas est"
        },
        {
          "catID": 9,
          "id": 90,
          "todo": "ad iusto omnis odit dolor voluptatibus",
          "desc": "minus omnis soluta quia\nqui sed adipisci voluptates illum ipsam voluptatem\neligendi officia ut in\neos soluta similique molestias praesentium blanditiis"
        },]
      },
      {
        catagory: "on deployment approvel", list: [{
          "catID": 10,
          "id": 91,
          "todo": "aut amet sed",
          "desc": "libero voluptate eveniet aperiam sed\nsunt placeat suscipit molestias\nsimilique fugit nam natus\nexpedita consequatur consequatur dolores quia eos et placeat"
        },
        {
          "catID": 10,
          "id": 92,
          "todo": "ratione ex tenetur perferendis",
          "desc": "aut et excepturi dicta laudantium sint rerum nihil\nlaudantium et at\na neque minima officia et similique libero et\ncommodi voluptate qui"
        },
        {
          "catID": 10,
          "id": 93,
          "todo": "beatae soluta recusandae",
          "desc": "dolorem quibusdam ducimus consequuntur dicta aut quo laboriosam\nvoluptatem quis enim recusandae ut sed sunt\nnostrum est odit totam\nsit error sed sunt eveniet provident qui nulla"
        },
        {
          "catID": 10,
          "id": 94,
          "todo": "qui qui voluptates illo iste minima",
          "desc": "aspernatur expedita soluta quo ab ut similique\nexpedita dolores amet\nsed temporibus distinctio magnam saepe deleniti\nomnis facilis nam ipsum natus sint similique omnis"
        },
        {
          "catID": 10,
          "id": 95,
          "todo": "id minus libero illum nam ad officiis",
          "desc": "earum voluptatem facere provident blanditiis velit laboriosam\npariatur accusamus odio saepe\ncumque dolor qui a dicta ab doloribus consequatur omnis\ncorporis cupiditate eaque assumenda ad nesciunt"
        },
        {
          "catID": 10,
          "id": 96,
          "todo": "quaerat velit veniam amet cupiditate aut numquam ut sequi",
          "desc": "in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut"
        },
        {
          "catID": 10,
          "id": 97,
          "todo": "quas fugiat ut perspiciatis vero provident",
          "desc": "eum non blanditiis soluta porro quibusdam voluptas\nvel voluptatem qui placeat dolores qui velit aut\nvel inventore aut cumque culpa explicabo aliquid at\nperspiciatis est et voluptatem dignissimos dolor itaque sit nam"
        },
        {
          "catID": 10,
          "id": 98,
          "todo": "laboriosam dolor voluptates",
          "desc": "doloremque ex facilis sit sint culpa\nsoluta assumenda eligendi non ut eius\nsequi ducimus vel quasi\nveritatis est dolores"
        },
        {
          "catID": 10,
          "id": 99,
          "todo": "temporibus sit alias delectus eligendi possimus magni",
          "desc": "quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis nihil\nitaque dolorem quia"
        },
        {
          "catID": 10,
          "id": 100,
          "todo": "at nam consequatur ea labore ea harum",
          "desc": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
        }]
      },
    ])
  }, []);
  return (
    <div className="app">
      {/* <Notification content='Some thing went wrong' /> */}
      <button onClick={() => console.log("DB", DB)}>log DB</button>
      <div className="titleAppContainer"></div>
      <div className="innerContainer">
        {todo.map((v, i) => <div key={i} className="todoStatus">
          <div className="titleHead">{v.catagory}</div>
          <div className="todo-list-container">
            {v.list.map(v => <div key={v.id} className="todo-container">
              <div className="left">
                <div className="todo-head overflow-ellipsis">{v.todo}</div>
                <div className="todo-desc overflow-ellipsis">{v.desc}</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>)}
          </div>
        </div>)}
        {/* 
        <div className="todoStatus active">
          <div className="titleHead">On progress</div>
          <div className="todo-list-container">
            <div className="todo-container">
              <div className="left">
                <div className="todo-head">The title</div>
                <div className="todo-desc">The description...</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>
            <div className="todo-container">
              <div className="left">
                <div className="todo-head">The title</div>
                <div className="todo-desc">The description...</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>
            <div className="todo-container">
              <div className="left">
                <div className="todo-head">The title</div>
                <div className="todo-desc">The description...</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>
          </div>
        </div>
        <div className="todoStatus">
          <div className="titleHead">On progress</div>
          <div className="todo-list-container">
            <div className="todo-container">
              <div className="left">
                <div className="todo-head">The title</div>
                <div className="todo-desc">The description...</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>
            <div className="todo-container">
              <div className="left">
                <div className="todo-head">The title</div>
                <div className="todo-desc">The description...</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>
            <div className="todo-container">
              <div className="left">
                <div className="todo-head">The title</div>
                <div className="todo-desc">The description...</div>
              </div>
              <div className="right">
                <div className="time">00:09</div>
              </div>
            </div>
          </div>
        </div>
        <div className="todoStatus"></div>
        <div className="todoStatus"></div>
        <div className="todoStatus"></div> 
        */}

      </div>
    </div>
  );
}

export default App;
