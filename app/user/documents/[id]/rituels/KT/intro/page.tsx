import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen ">
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mx-auto prose max-w-none text-gray-700 p-3">
          <section className="text-center">
            <p className="text-red-600 font-bold">
              GRAND PRIEURÉ des ORDRES UNIS
            </p>
            <p>Maçonniques, Religieux et Militaires</p>
            <p>du Temple et du Sépulcre</p>
            <p>et de l'Hôpital de Saint Jean de Jérusalem, </p>
            <p>de Palestine, Rhodes et Malte</p>
            <p>pour la France</p>
            <br />
            <p className="text-red-600 font-bold">RITUEL N° 1</p>
            <br />
            <h1>
              ORDRE MAÇONNIQUE DU TEMPLE
              <br />
              INSTALLATION D'UN PRÉCEPTEUR
              <br />
              ET MANIEMENT DE L'ÉPÉE
            </h1>
            <br />
            <br />
            <p>2016</p>
          </section>

          <section className="mt-8">
            <h2>Table des Matières</h2>
          </section>
          <section>
            <h1>Préface à la 3ᵉ édition française </h1>
            <br />
            <p>
              Cette édition, la seule autorisée par le Grand Prieuré des Ordres
              Unis pour la France, à l'usage de ses Préceptoreries de langue
              française, contient une rubrique qui s'est développée que possible
              pour la bonne compréhension de la gestuelle du cérémonial et, en
              particulier, des devoirs du Maréchal et de son adjoint.
              <br />
              Elle est fidèle au rituel reçu du Grand Prieuré d'Angleterre, à
              l'exception des modifications récentes apportées par lui, suite au
              retrait par la Grande Loge Unie et le Suprême Grand Chapitre
              d'Angleterre des châtiments dans leurs obligations respectives, et
              à la réforme profonde de nos cérémonies par le second,
              modifications non adoptées par la Grande Loge Nationale Française
              et le Suprême Grand Chapitre des Maçons de l'Arche de France, dans
              leurs lectures.
            </p>

            <ul>
              Ces différences affectent : <br />
              <li>
                les châtiments, supprimés de l'Obligation dans le rituel
                anglais, qui sont ici rétablis ;
              </li>
              <li>
                l'explication du signe pénal également rétablie à sa place dans
                la présentation des symboles de l'Ordre sur le sépulcre ;
              </li>
              <li>
                l'annonce de la fermeture de la Préceptorie, par le Précepteur,
                après les affaires diverses, traitées à l'unique lever, qui a
                été développée et explicitée ;
              </li>
              <li>
                pour la bénédiction ultime, à la fermeture de la Préceptorie,
                les Chevaliers ne prennent pas la position de Prière mais
                viennent au "PRÉSENT - TUEZ" ;
              </li>
              <li>
                le mot d'un Maçon de l'Arche Royale n'est plus demandé au, ni
                donné par le Pèlerin à aucun moment.
              </li>
            </ul>

            <p>
              D'autre part, afin de permettre aux FF∴ chevaliers membres de
              notre Grand Prieuré de pouvoir se faire reconnaître lors de leurs
              visites à l'étranger et d'être à même d'examiner tout chevalier
              visiteur membre d'une juridiction templière étrangère reconnue, il
              a été jugé opportun que la "clé" comporte dorénavant les signes,
              gages, attouchements et mots en usage sous le Grand Prieuré
              d'Écosse et le Grand Encampment des États-Unis, dont les rituels
              diffèrent notablement de celui reçu du Grand Prieuré d'Angleterre.
            </p>
          </section>
          <section>
            {" "}
            <h1>Avertissement</h1>
            <p>
              Maintenant armé chevalier maçon du Temple, le lecteur doit savoir
              qu'à ce titre, il a reçu un grade ou degré d'un ordre maçonnique,
              qui n'est en rien, à quelque titre que ce soit, le continuateur ou
              le successeur, ni une résurgence de l'ordre historique du Temple.
              <br />
              Celui-ci, fondé à Jérusalem en décembre 1119, ou janvier 1120,
              officialisé au parlement ou synode de Naplouse le 16 janvier
              1129/30, institué canoniquement au et par le concile de Troyes le
              22 janvier 1128/29, comme milice des Pauperes commilitones Christi
              Templique Salomonici (pauvres soldats du Christ et du Temple de
              Salomon), fut confirmé par la bulle Omne datum optimum du pape
              Innocent II en mars 1138/39. <br />
              On se souviendra que l'année julienne (ou "style de
              l'Annonciation") commençant alors le 25 mars, sur tous les
              documents de l'époque, une date du premier trimestre doit être
              aujourd'hui comprise comme relevant de l'année suivant celle
              mentionnée (indiquée ainsi : 1119/1120). <br />
              La bulle Vox in excelso, (souvent improprement intitulée Vox
              clamantis) fulminée le 13 ou le 22 mars 1311/12, mais publiée
              seulement le 3 avril 1312, au cours du (mais non par le) concile
              de Vienne sur le Rhône (alors terre d'Empire), prononça sa
              suppression "par provision", sans porter de condamnation. La
              dissolution était ensuite confirmée et ses biens transférés « à
              ceux qui exposent leurs vies pour la défense de la foi au-delà des
              mers », par la bulle Ad providam Christi vicarii du 2 mai 1312,
              fulminée par Clément V, au nom de l'Église romaine qui, seule,
              l'ordre tenait sa légitimité comme sodalité religieuse militaire.{" "}
              <br />
              Depuis cette date l'ordre historique du Temple n'existe plus et,
              bien qu'une succession locale semble possible, sinon avérée, dans
              l'ordre de Notre-Dame-de-Montesa (la Orden de Montesa) en Aragon
              (Espagne), par bulles du 10 juin 1317; l'ordre du Christ (A Ordem
              do Cristo) au Portugal, par bulles du 15 mars 1319, puis l'ordre
              du Christ au Vatican, issu plus tard du précédent, nul ne peut
              raisonnablement affirmer aujourd'hui qu'il existerait encore, à
              quelque titre ou sous quelque appellation que ce soit. Nul ne peut
              donc aujourd'hui légitimement prétendre y appartenir et encore
              moins en être dirigeant. <br />
            </p>
          </section>
          <section>
            {" "}
            <h1>
              Histoire sommaire des pauvres chevaliers du Christ et du Temple de
              Salomon
            </h1>
            <p>
              En 1118, date traditionnelle, mais la plupart des historiens
              s'accordent aujourd'hui sur 1119/1120 - Hugues de Payens et
              Geoffroy de Saint-Omer (ou Saint-Adhémar, il existe plusieurs
              graphies de ces noms) et sept autres chevaliers croisés, pour la
              plupart français, se lièrent par-devant le patriarche de Jérusalem
              par des vœux de pauvreté, chasteté et obéissance, à la défense du
              Royaume latin nouvellement dirigé par Baudouin II. Ils
              s'engageaient plus spécialement à protéger les pèlerins lors de
              leur dangereux voyage depuis la côte jusqu'à Jérusalem. <br />
              Le roi leur octroya un cantonnement à l'emplacement du Temple de
              Salomon et ils furent dès lors connus sous le nom de Pauperes
              Commilitones Christi et Templi Salomonis (Pauvres Soldats du
              Christ et du Temple de Salomon). La pauvreté à laquelle ils
              s'engageaient est démontrée par le premier sceau de leur sodalité
              représentant deux cavaliers sur un même cheval. <br />
              L'ordre semble avoir mis quelques années à s'établir, puis
              l'Église et le Royaume franc s'y intéressèrent. Foulques, comte
              d'Anjou puis roi de Jérusalem, prononça ses vœux, d'autres hauts
              seigneurs suivirent, des terres furent acquises puis un flot
              ininterrompu de donations arriva. <br />
              Il avait adopté la règle bénédictine mais en 1126, à l'instigation
              de Baudouin II, Hugues de Payens et quelques-uns de ses compagnons
              se rendirent à Rome où le pape Honorius II, bienveillant, les
              invita à se rendre au concile devant se réunir à Troyes en
              1128/1129. Envoyant un brillant futur pour ces Templiers, il s'en
              remit à Bernard de Clairvaux pour leur préparer une nouvelle
              règle. Celle-ci sera rigoureuse et ascétique, le luxe et
              l'apparence en étant exclus; les plaisirs du monde, la chasse
              même, interdits. Dès l'origine, seuls des nobles pouvaient être
              reçus mais, comme chez les Hospitaliers, la nécessité de frères
              servants se fit rapidement sentir. <br />
              Cette constitution prévoyait le manteau blanc qui distingue
              jusqu'à ce jour les chevaliers maçons du Temple. La croix rouge,
              symbole du martyre, fut ajoutée au manteau en 1147. Une coiffe
              blanche, origine de notre capuchon, était portée sous le casque,
              nécessaire au combat. Une toque de drap rouge le remplaçait au
              couvent. <br />
              Hugues de Payens, pourvu de cette nouvelle règle, regagna
              Jérusalem, parcourant la France, l'Angleterre et l'Écosse. Suite à
              sa visite, les souverains et leurs sujets dotèrent l'ordre de
              terres et autres bénéfices et, comme pour les Hospitaliers, il
              devint nécessaire d'instituer des centres administratifs locaux.
              Ce sont les « Préceptories » qui servirent de centres de
              recrutement pour la Terre Sainte. La province du Temple en
              Angleterre, comprenant alors l'Écosse et l'Irlande, fut instituée
              par Hugues de Payens en 1128. Les autres provinces devaient être :
              le Portugal, la Castille, le Léon, l'Aragon, la France,
              l'Aquitaine, la Provence, l'Allemagne, l'Italie, la Sicile et, en
              Méditerranée orientale, Antioche et Tripoli. <br />
              Des privilèges furent obtenus : exemption de la juridiction
              épiscopale, le Pape étant l'unique supérieur, droit d'asile pour
              toutes les maisons du Temple, et exemption totale de taxes et
              dîmes sur leurs biens. Survolant leur histoire, souvenons-nous de
              leur combat incessant contre les sarrasins, aux côtés des
              Hospitaliers et des difficultés qu'ils ont, au moins en Terre
              Sainte, endurées pour la foi chrétienne. On rapporte qu'au moins
              vingt mille y périrent. <br />
              Après la chute d'Acre aux mains des musulmans, les survivants de
              l'ordre templier allèrent à Chypre, où il avait assemblé il acquis
              du roi RICHARD Ier d'Angleterre. Ils ne restèrent toutefois pas
              conformément aux Hospitaliers, en Méditerranée. Les chevaliers se
              retirèrent dans les diverses préceptories de leur pays natal pour
              y vivre une vie paisible. <br />
              Certains Templiers, peut-être perdant de vue les nobles buts de
              leurs prédécesseurs, purent alors être taxés d'arrogance, luxure,
              apostasie, trahison, oppression, extorsion, mais bien des
              accusations portées contre eux furent souvent inspirées seulement
              par la jalousie de leurs richesses, progressivement acquises par
              des moyens tout à fait honnêtes, et de l'exemption d'impôts et
              autres taxes communément levées. Notre propos ici n'est pas
              d'enquêter sur leur culpabilité ou innocence, les études récentes
              et sérieuses sont légion tendant toutes à exonérer l'ordre des
              accusations alors portées. Disons seulement que, comme de nos
              jours pour les critiques acerbes de la Franc-maçonnerie, les
              détracteurs d'alors ont souvent relevé les errements de
              quelques-uns pour en taxer l'ordre entier. <br />
              Il y eut, particulièrement en France, une persécution assidue des
              Templiers, qui s'acheva en 1314 par la torture et la mort sur le
              bûcher de Jacques de Molay, le Grand Maître du Temple. En Aragon
              et Castille, au Portugal et en Allemagne, l'ordre fut reconnu
              innocent des crimes imputés, alors qu'en Angleterre, le verdict
              semble avoir été "non établi".
              <br />
              Le pape prononça la dissolution de l'ordre en 1312 et décida que
              ses possessions seraient transférées aux Hospitaliers, qui se
              réjouirent tout d'abord de ces nouvelles richesses, avant de se
              reprendre. <br />
              Nombre de chevaliers du Temple vécurent de longues années encore.
              Il se raconte que des préceptories auraient poursuivi leur
              existence, continuant à recevoir des novices, mais la plus pugnace
              des légendes concerne l'Écosse où la décrétale papale n'aurait eu
              aucun effet. Il se peut, en effet, que des intégrations ou
              assimilations aient eu lieu à petite échelle entre Templiers et
              Hospitaliers, mais vouloir fonder l'histoire sur des rêves est
              toujours hasardeux. <br />
            </p>
          </section>
          <section>
            {" "}
            <h1>
              Introduction au grade maçonnique du Temple et son implantation en
              France
            </h1>
            <p>
              Les francs-maçons du début du XVIIIe siècle étaient de confession
              chrétienne trinitaire, quand les Constitutions de 1723 et de 1738
              ouvrirent la porte des loges à « tout homme sincère et loyal »,
              quelles que soient ses convictions, à l'exception des athées
              (cliniquement) stupides, seule acceptation courante du mot stupide
              à cette époque. <br />
              La Bulle papale In Eminenti Apostolatus Specula, fulminée en 1738,
              excommunia tous les francs-maçons, ainsi que ceux qui leur
              prêteraient concours, dès promulgation et enregistrement par les
              autorités civiles des différents pays majoritairement catholiques.
              Cet événement semble avoir suscité, à partir de 1740, la création
              d'un certain nombre de grades à substrat chevalier, d'abord en
              France (bien que la Bulle, non enregistrée par le parlement de
              Paris, n'y eût pas d'effet "légal") puis, graduellement à travers
              l'Europe. <br />
              Les plus importants furent un "rite" maçonnique templier, qui
              devait rapidement évoluer en plusieurs "familles", ainsi qu'un
              grade de Rose-Croix dont le destin fera l'un des pôles
              maçonniques, aucun n'ayant bien sûr, de lien direct historique ou
              rituel avec les anciens ordres religieux (monastiques) militaires
              ou les Rosicruciens du Moyen Âge. <br />
              On ne sait comment ni précisément quand les grades "Temple-Malte"
              firent leur apparition, mais on en retrouve des traces dès avant
              les années 1760, d'abord en Irlande, alors que la grande variété
              des rituels en usage qui nous sont parvenus, suggèrent diverses
              provenances. <br />
              Quoique Frederick SMYTH, dans son Brethren in Chivalry 1791-1991
              (1991), considère comme sujet à caution un procès-verbal de 1743
              de la Lodge of Stirling Kilwinning à Stirling, Écosse, ce document
              révèle la collation des grades de Red Cross, Ark Knight of Malta
              et Night [sic] Templar. Cette Loge possède toutefois un panneau
              sculpté contemporain portant nombre de symboles caractéristiques,
              notoirement étrangers à la Maçonnerie du Métier. W.J. HUGHAN,
              l'examinant en 1893, rendit compte à la Quatuor Coronati Lodge de
              l'indéniable curiosité de l'objet. <br />
              La pièce satirique A Letter from the Grand Mistress of the Female
              Freemasons [Une Lettre de la Grande Maîtresse des femmes
              franc-maçonnes], attribuée à Jonathan Swift, écrite entre 1726 et
              1731 mais publiée en 1746, fait allusion à la « fameuse vieille
              Loge de Kilwinning [sic] » et aux « Chevaliers de Saint-Jean de
              Jérusalem », de sorte qu'elle conduit à supposer qu'ils aient pu
              être alors liés dans la croyance populaire. <br />
              En Angleterre, sous la Grande Loge des Antients de 1751-53, on
              considérait que la charte symbolique possédée, permettait de
              conférer d'autres grades, tels ceux de Chevalier du Temple et de
              Rose-Croix, dans cette séquence. Laurence DERMOTT, leur célèbre
              Grand Secrétaire, écrivant en 1782, prétendait que les premiers
              chevaliers maçonniques du Temple furent faits à Fethard, au comté
              de Tipperary en Irlande. Dans leur History of the Grand Lodge of
              Ireland (1925), LEPPER et CROSSLE, très au fait des détails de
              l'histoire maçonnique locale, ont émis l'hypothèse que cette
              apparition devait dater d'avant 1764. <br />
              Le Règlement intérieur de la Loge n° 296 à Tipperary fondée en
              1758, examiné par Charles CAMERON, dans On the Origin and Progress
              of Chivalric Freemasonry the British Isles (1901) traite des
              grades de « Chev. du T[emple] et Chev. de M[alte] ». Bien que ce
              document ne soit pas daté, la Loge ayant été en sommeil dès 1771,
              il fut bien évidemment rédigé avant cette date. <br />
              La plus ancienne trace documentée de la collation du grade de
              Chevalier templier se trouve dans un procès-verbal du Chapitre St
              Andrew's Royal Arch de Boston, Massachusetts (28 août 1769),
              relatant qu'un certain William DAVIS (P.M. de la Loge n° 58,
              Antients, au 14e Régt d'Infanterie) sollicitant « les points
              appartenant au Maçon de l'Arche Royale... fut fait, recevant les
              quatre degrés d'Excell[en]t Supler Excellent], Royal Arche et Ch.
              du Temple ». Étaient présents trois visiteurs de la Loge n° 322,
              Irlande, au 29e Régt d'Infanterie. <br />
              Cependant, la Maçonnerie pratiquée dans les colonies britanniques
              d'Amérique étant évidemment d'importation, ce grade était
              nécessairement déjà pratiqué ailleurs. <br />
              La première occurrence avérée de la pratique du grade en
              Angleterre est relevée, comme au Massachusetts, au sein d'un
              Chapitre de l'Arche Royale, Friendship à Portsmouth, dont le
              procès-verbal du 21 octobre 1778 révèle que Thomas DUNCKERLEY (qui
              neuf ans plus tôt, y avait procédé à des cérémonies de Marque) les
              avisait qu'ils « pouvaient faire des Chevaliers du Temple » s'ils
              le souhaitaient et qu'en conséquence ils s'y étaient résolus.{" "}
              <br />
              Bristol, port de prédilection des voyageurs en provenance
              d'Irlande méridionale, semble avoir possédé l'un des premiers
              Camps ou Encampments (selon Richard SMITH, plus tard Grand
              Surintendant de BALDWIN, écrivant vers 1820) dès 1784-85, au sein
              du chapitre Charity, de l'Arche Royale. D'autres historiens de
              BALDWIN sont convaincus que ce premier Camp fut créé en, ou même
              avant, 1780 et qu'en fait il s'agit bien du Camp of Baldwyn.{" "}
              <br />
              L'année suivante, la Grand Lodge of All England à York (av. 1725 -
              ap. 1792) devait déjà conférer le grade puisque, comme le rapporte
              le Rév. Neville BARKER CRYER, (York Mysteries Revealed), elle
              déterminait dans son calendrier des soirées spécifiques pour sa
              collation, et il est à supposer qu'elle le faisait depuis quelque
              temps déjà. <br />
              Les loges militaires étaient aussi souvent les conservatoires de
              grades chevaleresques et il ne faut pas perdre de vue que la
              plupart tenaient leur charte d'Irlande. <br />
              Les historiens de l'École "authentique" britannique, depuis
              CHETWOODE CRAWLEY (A.Q.C., 26), ont fait littître des diverses
              théories de l'origine de la chevalerie maçonnique dans les îles
              britanniques: la Charte de Larmenius, les deux légendes de la
              "transmission écossaise", le discours du Chevalier RAMSAY, la
              Stricte Observance templière de von HUND. <br />
              Point n'est besoin, en effet, d'aller chercher ailleurs ce qui est
              présent, en abondance, dans les maçonneries irlandaise, écossaise
              et anglaise à la même époque. <br />
              Disons simplement, comme l'avance Neville B. CRYER, dans son tout
              récent Following the Path of our Knightly Roots in Delving Further
              Beyond the Craft (2009) que divers éléments caractéristiques de la
              partie "historique" des Constitutions de 1723, comme les prémices
              de l'Heredom of Kilwinning à Londres (c. 1741), devant plus tard
              donner l'Ordre Royal d'Écosse, sont des indices suffisants que
              l'idée d'une chevalerie chrétienne faisait déjà son chemin dans la
              maçonnerie des îles britanniques. <br />
              Les chevaliers anglais, cherchant le moyen de s'assembler comme
              tels, hors du cadre des loges ou des chapitres au sein desquels
              ils avaient été reçus, après une première tentative infructueuse
              du Baldwyn Encampment de Bristol, le 20 décembre 1780, d'organiser
              l'ensemble sur une base pérenne en Angleterre, approchaient Thomas
              DUNCKERLEY et, recevant son soutien, il devint possible de
              constituer un corps national. En 1791, sous sa présidence, avait
              lieu la première réunion du Grand Conclave des Grand Elect-Knights
              Templar Kadosh and Holy Sepulchre of St John of Jerusalem,
              Palestine, Rhodes and Malta constitué par sept Camps (Encampments)
              indépendants. Cependant, un conservatisme notoire, des doutes
              quant aux effets de la Loi de 1799 relative aux Sociétés secrètes
              sur une telle entreprise, comme divers autres facteurs, eurent
              pour conséquence que cette fondation n'eut pas d'effets
              significatifs pendant plusieurs années. <br />
              Pendant la grande maîtrise du duc de SUSSEX (1812-1843), une large
              majorité de la Grande Loge Unie s'opposa longtemps à toute
              activité maçonnique au-delà des grades symboliques et de l'Arche
              Royale, malgré l'exemption claire, mais trop rarement citée,
              concernant les « Grades des Ordres de Chevalerie », inscrite à
              l'Article II de l'Acte d'Union des deux Grandes Loges (Anciens et
              Modernes), signé le 25 novembre 1813. ( - « Il est arrêté et
              déclaré que la Maçonnerie pure et ancienne se compose de trois
              grades et pas plus, c.à.d. ceux d'Apprenti Reçu, de Compagnon du
              Métier et de Maître Maçon (y compris l'Ordre Suprême de la Sainte
              Arche Royale). Mais cet article n'a pas pour but d'empêcher les
              [membres des] Loges et Chapitres de se réunir en assemblées dans
              les grades des Ordres de Chevalerie, selon les Constitutions des
              dits Ordres ».) <br />
              Pour parer à toute crise, le duc de Sussex ne fit plus convoquer
              le Grand Conclave, instance octroyant alors les chartes, laissant
              toutefois faculté à ses officiers d'accorder les dispenses
              nécessaires aux réunions et à la réception de chevaliers, jusqu'à
              l'expédition de chartes officielles. <br />
              Vers 1830, la tension ayant diminuée, le duc, sous sa signature et
              sans réunir le Grand Conclave, octroya quelques chartes à des
              Encampments (Camps) et constitua même une Province templière pour
              le Comté de Dorset. Après sa mort en 1843, la situation ayant
              évolué, le député du duc, John Christian BURCKHARDT, fut à même de
              réunir le Grand Conclave, de faire élire et installer le Cel
              Charles KEMEYS-TYNTE comme Grand Maître et rétablir des conditions
              normales de fonctionnement, à l'exception de l'octroi des Chartes,
              qui demeura la prérogative du seul Grand Maître. <br />
              Lorsque, en 1791, Thomas DUNCKERLEY prit le contrôle de ce
              système, il ne chercha pas à réglementer l'usage des rituels
              pratiqués par les Encampments divers, mais dans les années 1850,
              il apparut judicieux de parvenir à un certain degré
              d'uniformisation. Les anciens rituels furent collationnés et le
              rituel templier encore en usage fut mis en forme sur la base de
              l'un des plus anciens alors connus, datant du XVIIIe siècle.
              Quelques années plus tard la même chose était faite pour ceux de
              la Passe de Méditerranée (ou chevalier de saint Paul) et de
              l'Ordre maçonnique de Malte. <br />
              Dans les années 1867-69 on tenta avec insistance d'étendre ce
              principe, en vigueur en Angleterre et au Pays de Galles, à
              l'Écosse et à l'Irlande, par l'établissement d'un Convent Général
              en 1873, laissant à chaque nation le contrôle de ses affaires
              internes, mais instituant un rituel commun à tous et limitant
              l'octroi des plus hautes dignités et fonctions au seul Grand
              Maître, chaque pays étant gouverné par un Grand Prieur. <br />
              Seules l'Angleterre et le Pays de Galles et l'Irlande mirent cela
              en pratique, l'Écosse s'étant très tôt retirée des négociations.
              Les modifications apportées rencontrèrent toutefois une très vive
              opposition; les projets initiaux furent revus. Malgré l'adhésion
              ultérieure du Canada, le Convent Général s'étiola peu à peu puis
              fut dissous en 1895. Sans laisser de regrets, chaque pays
              retrouvant l'entière souveraineté sur son administration, ses
              rituels et l'octroi de ses honneurs et dignités. <br />
              De nos jours, les trois Grands Prieurés d'Angleterre & Pays de
              Galles, d'Écosse et d'Irlande se concertent de temps à autre par
              la réunion de leurs Grands Maîtres et Grands Vice Chanceliers ou
              Grand Secrétaire, sur les questions fondamentales pouvant affecter
              le développement des Ordres Unis. <br />
              Le Grand Prieuré des Ordres Religieux, Militaires et Maçonniques
              Unis du Temple et de Saint-Jean de Jérusalem, Palestine, Rhodes et
              Malte pour l'Angleterre, le Pays de Galles et ses Provinces
              d'Outremer gouverne aujourd'hui près de quatre cents Preceptories
              du Temple/Prieurés de Malte de par le monde. Il a donné naissance
              à de nombreux Grands Prieurés: du Canada, de la plupart des états
              d'Australie, d'Espagne, du Brésil, de Nouvelle Zélande, de
              Finlande, des Pays-Bas..., et contrôle encore directement les
              Ordres Unis aux Antilles, dans quelques pays d'Asie, d'Amérique du
              Sud et quelques Provinces canadiennes et dans les états africains
              anglophones où il est implanté. <br />
              Son renom et sa notoriété sont tels que la Belgique et la France,
              où l'ordre templier maçonnique fut un temps seulement représenté
              par les Chevaliers Bienfaisants de la Cité Sainte (C.B.C.S.),
              obtinrent de lui, en 1992, l'adjonction de l'ordre maçonnique de
              Malte à leur système chevaleresque templier chrétien du Régime
              Écossais Rectifié. La France connut ce système hybride jusqu'en
              2001, quand le Grand Prieuré CBCS d'alors se mit hors la communion
              régulière en intégrant une cohorte de grades et systèmes
              totalement étrangers au Régime Rectifié. <br />
              Près de deux cent cinquante chevaliers français, membres de la
              Grande Loge Nationale Française et du Suprême Grand Chapitre des
              Maçons de l'Arche Royale de France, ayant été reçus depuis de
              longues années dans les ordres maçonniques Unis au sein de
              Preceptories anglaises, écossaises ou espagnoles ou de
              Commanderies américaines en Allemagne, cent cinquante-neuf d'entre
              eux pétitionnèrent pour trois Preceptories qui furent consacrées
              par le Grand Prieuré d'Angleterre à Paris et Toulouse. Enfin, le
              27 juin 2003, en présence de représentants de plusieurs Grands
              Prieurés, l'Éminentissime et Suprême Grand Maître d'Angleterre,
              feu l’Em et S.Ch. Leslie Felgate Dring , G.C.T. constitua le Grand
              Prieuré des Ordres Unis, Maçonniques, Religieux et Militaires du
              Temple et du Sépulcre et de l'Hôpital de Saint-Jean de Jérusalem,
              de Palestine, Rhodes et Malte pour la France et installa son
              premier Grand Maître, lequel installa son Grand Sénéchal et
              investit ses premiers Officiers. <br />
              Dès septembre 2001, les C.B.C.S. (certains également Chevaliers
              des Ordres Unis) avaient déjà reconstitué un Grand Prieuré
              Rectifié de France (G.P.R.F.), très vite reconnu et solennellement
              installé par le Grand Prieuré Indépendant d'Helvétie (GPIH), en
              juillet 2002. <br />
              Un traité d'Alliance fut donc immédiatement conclu et signé entre
              les Grands Prieurés français de ces deux régimes templiers
              maçonniques chrétiens, inaugurant une harmonieuse et féconde
              cohabitation "hexagonale" qui, tout en permettant l'intervisite,
              assure à chacun la spécificité de ses particularités et la
              cohérence du cheminement personnel de ses membres, préservé par
              l'avenant signé en 2006 (cf. annexe du volume des Constitution,
              Statuts et Règlements). <br />
            </p>
          </section>
          <section>
            <h1>Évolution du rituel du grade du Temple</h1>
            <p>
              De nombreux rituels manuscrits conservés permettent d'étudier
              leurs développements et modifications et voir dans quelle mesure
              les rituels anciens et particuliers de divers Camps ou
              Encampments, tel celui de Baldwyn, diffèrent de ceux
              d'aujourd'hui. Tous ne peuvent pas être précisément datés étant,
              la plupart du temps, des copies récentes de manuscrits plus
              anciens. <br />
              L'une d'entre elles datée de 1877 d'un rituel des années 1780,
              contient un catéchisme ou instruction par questions et réponses.
              Un autre remonte aux environs de 1830, quand Alexander DALZIEL
              s'attela à une révision profonde des rituels utilisés au sein du
              Royal Kent Encampment de Newcastle-upon-Tyne, comprenant les
              grades de « Chevalier du Temple, Croix Rouge et Saint-Sépulcre de
              Jérusalem, Chevalier de Rhodes et Palestine, Chevalier de Malte,
              Passe de Méditerranée, Pélican et Aigle, Harodim, Kadosh » et,
              bien qu'il ne soit pas inclus dans le titre, un court cérémonial
              du Ne Plus Ultra. George E.W. BRIDGE a établi une transcription de
              ce rituel Dalziel, dont il note que « outre cette révision, il
              peut être considéré comme l'une des formes des rituels templiers
              en usage au début du dix-neuvième siècle, et peut-être même celui
              en usage dans les loges de la côte nord-est au dix-huitième siècle
              ». <br />
              L'adoption par le Grand Conclave, après étude approfondie, le 11
              avril 1851, d'un rituel officiel pour le grade de chevalier du
              Temple, nous rapproche de la forme actuellement en usage. À ce
              stade, il ne s'agit que de cahiers laborieusement manuscrits.
              Jusqu'en 1871, un exemplaire étant conservé aux archives du Grand
              Prieuré, ce fut sans doute la tâche d'un calligraphe de talent, à
              la Chancellerie des Ordres, d'établir des copies pour expédition
              aux Commandeurs Provinciaux qui se chargeaient ensuite de leur
              dissémination dans les Encampments sous leur contrôle. Cela fut
              sans doute cause de légères variations çà et là, et d'usages
              locaux. <br />
              John MASSON, Grand Chancelier du Grand Conclave, s'employa à
              préparer pour l'ordre maçonnique du Temple, ce que PRESTON avait
              produit pour les grades symboliques. L'œuvre de PRESTON suivit
              dans l'Instruction par questions et réponses du rituel
              d'Émulation, sans doute trop rarement, encore faite dans les
              loges. Ceux de MASSON en revanche auraient mérité un sort
              meilleur, bien que de nos jours, peu de chevaliers soient disposés
              à apprendre ces questions / réponses, pour être à même d'éclairer
              l'esprit de leurs frères. <br />
              Le Grand Conclave, appréciant alors hautement ce travail, décida
              de sa promulgation en 1858, imprimé en trois opuscules reliés.{" "}
              <br />
              Le premier contenait les questions, le deuxième les réponses, et
              le troisième une instruction "sur l'origine de l'Ordre, ses
              progrès et développement; sa suppression; son renouveau au sein de
              la Maçonnerie, les bienfaits en résultant et la récompense
              espérée". Le "renouveau" évoqué ici se fondant sur le principe
              d'une transmission via l'Écosse. <br />
              Le rituel établi par le Convent Général (1873) fut, à parution,
              accueilli avec peu d'enthousiasme. Des rituels imprimés conformes
              aux textes antérieurement approuvés par le Grand Conclave,
              continuèrent à être édités. <br />
              "A Lewis" [aujourd'hui "Lewis Masonic"] qui éditait dès 1870 des
              rituels pour les grades symboliques et autres, publia, en 1876,
              The Perfect Ceremonies of the Royal, Exalted, Religious and
              Military Order of Masonic Knights Templar, volume qui contenait
              aussi les cérémonies de Malte et la Passe de Méditerranée, ainsi
              que le "Tuileur" de MASSON. C'était, prétendait justement
              l'éditeur, une copie du rituel approuvé par le Grand Conclave
              d'Angleterre et du Pays de Galles et l'accueil qui lui fut fait
              réservé justifia plusieurs rééditions. <br />
              Ce volume pouvait aussi contenir celui de « Rose Croix de Heredom
              », intitulé plus tard « copie du rituel du Suprême Conseil du 33e
              pour l'Angleterre et le Pays de Galles ». Là encore, la similitude
              constatée avec des rituels manuscrits plus anciens, comme avec des
              versions officielles imprimées plus récentes, montre combien il
              est, et fut, considéré comme authentique. Des éditions combinées
              se succédèrent jusqu'à la fin du siècle, le Grand Prieuré étant
              alors bien sûr en pleine activité. Aucune cependant ne faisait la
              moindre allusion au Convent Général, le Grand Conclave étant
              toujours mentionné comme source, au moins jusqu'à l'édition de
              1891 qui se réfère aux Ordres Unis. <br />
              Le premier rituel officiel du Grand Prieuré d'Angleterre parut en
              1900, souvent révisé, modifié, réédité ou réimprimé, dont l'usage
              fut immédiatement rendu obligatoire pour tous, à l'exception de
              quelques "préceptories de temps immémorial". Cette première
              édition comportait une modification d'importance: le cérémonial
              d'ouverture et de fermeture "longues" par questions et réponses
              entre le Précepteur et les Connétables, réduit à la version
              actuelle, bien que les Préceptories existantes soient autorisées à
              conserver l'ancien mode. À de rares exceptions près, les éditions
              successives, jusqu'en 1970, groupèrent les rituels du Temple et de
              Malte en un seul volume. Depuis cette date ils sont en deux
              volumes distincts, mais avec une rubrique gestuelle beaucoup plus
              détaillée. <br />
              Il existe encore, çà et là, des éditions à usage strictement
              local. Celle de la Préceptorie Grosvenor n° 132 à Chester,
              comporte les anciennes ouverture et fermeture, mais est
              généralement conforme quant au reste. D'autres cas, comme la
              Préceptorie de St. Salem à Macclesfield, attestent l'usage des
              inserts modificatifs à l'édition de 1851, imprimés localement.{" "}
              <br />
              Le rituel spécial de Baldwyn et ceux d'autres
              Encampments/Conclaves/Préceptories qui jouissent du statut de
              "temps immémorial", sont des rituels spécifiques, combinant en une
              cérémonie les grades du Temple et de Malte. La Préceptorie
              Antiquity à Bath, probablement unique, possède son cérémonial
              particulier d'ouverture et fermeture, semblable à celui de
              Baldwyn, mais précisant ensuite que le rituel officiel doit être
              suivi, sauf pour une incidente curieuse: après l'investiture du
              nouveau chevalier, un "cuisinier" entre, un grand couteau à la
              main, menaçant de trancher les éperons de quiconque manquerait à
              ses vœux. Cette particularité existe également à Bristol. <br />
              En Irlande, l'usage de rituels imprimés, sauf peut-être outremer,
              est généralement vivement déconseillé, tant dans la Maçonnerie
              symbolique que dans les autres grades ou ordres. À Dublin, à côté
              d'une Grande Loge et d'un Grand Chapitre d'Instruction, destinés
              aux frères ou compagnons désireux de se familiariser avec les
              fonctions qu'ils occupent dans les divers ateliers, existe aussi
              une Grande Préceptorie d'Instruction pour les Ordres Unis qui se
              réunit quatre fois l'an à cet effet, mais le Grand Prieuré édite
              toutefois des rituels imprimés permettant d'apprendre chez soi
              aussi bien les textes que la gestuelle. <br />
              L'Écosse dispose également de rituels officiels dont les rubriques
              sont détaillées, ainsi qu'un Guide du Cérémonial qui, destiné à
              ses propres chevaliers pour y apprendre leur rituel, permettent au
              maçon étranger de le mieux découvrir et pouvoir ainsi comparer ses
              propres usages à ceux en vigueur au nord de la frontière
              écossaise. <br />
              Disons tout de suite que les cérémonies propres à ces trois
              juridictions ont beaucoup en commun et qu'un visiteur s'y sent
              partout chez lui. La disposition d'une chapelle de l'ordre du
              Temple est à première vue semblable dans les trois, à cette
              différence près que ce que nous sommes habitués à voir au centre
              de la salle en Angleterre est absent en Irlande et en Écosse, où
              les deux étendards sont disposés à l'orient plutôt qu'à
              l'occident. <br />
              Les titres portés par certains officiers dans une Préceptorie
              écossaise et leurs places respectives dans la chapelle sont
              souvent assez différentes de celles occupées par les officiers
              équivalents en Angleterre. On notera également des variations dans
              l'enchaînement des événements rituels et dans les textes en usage.
              L'important est que, au sein des trois juridictions, un candidat
              reçoit les mêmes enseignements et est conduit à aspirer aux mêmes
              idéaux qui sont l'apanage de l'ordre du Temple depuis les temps
              les plus reculés. <br />
              Le chevalier maçonnique du Temple a connu des changements radicaux
              des décors en usage. <br />
              Les Statuts de 1791 mentionnent comme obligatoire un cordon ou
              écharpe et médaille, mais une lettre de Dunckerley de la fin de
              cette année nous apprend qu'il fournissait des « écharpes, plaques
              et croix » à un Encampment, au prix modique de £3.6s.0d [£3.30]
              les trois. Un mois plus tard seulement il donnait déjà beaucoup
              plus de détails : <br />
              La veste aura 14 boutons, dix sur le devant et quatre sur les
              hanches, & la chemise avec deux très petits boutons dorés au
              poignet de chaque manche, et un Gilet de Casimir Blanc & des
              boutons de casquette française blancs, avec une culotte noire.
              J'ai payé le Tailleur £4.4s.0d. [£4.20] pour mes Veste & Gilet.
              Dans tous les Chapitres on porte Tricorne et cocarde avec Épée et
              écharpe de velours noir. Les Écharpes, Cocardes et Épées doivent
              être gardées dans une boîte par chaque Chapitre <br />
              La plupart des Chevaliers (J'en ai plus de 120 immatriculés) ont
              déjà assisté [aux réunions] dans leur uniforme... <br />
              Une lettre du Grand Scribe en date du 14 février 1805 précise la
              "requête" du Duc de KENT quant aux bijoux et décors: Le Commandeur
              porte l'écharpe noire et une plaque à huit rais; les Capitaines
              l'écharpe noire et une plaque à sept rais; les Compagnons,
              l'écharpe avec une Croix de nacre nous portent un tablier bordé,
              doublé et lié de ruban noir, orné d'un crâne et des os en sautoir;
              et pour une certaine uniformité, le costume noir et l'épée noire
              sont jugés plus appropriés que tout autre costume. On peut
              s'étonner que ces dispositions n'aient pas trouvé place dans la
              deuxième édition des Statuts de 1809. <br />
              Un court historique (1917) du Antient York Conclave of Redemption
              nous apprend que l'écharpe était en soie moirée noire, de quatre
              pouces [10 cm] de lé, frangée aux extrémités, la croix était
              d'argent et la plaque à sept pointes, avec une devise. Un chapeau
              noir et une épée noire devaient également être portés en Conclave
              « conformément aux Statuts de 1791 », qui ne mentionnent en fait
              ni coiffure ni arme ! <br />
              De la région de Preston, une circulaire conservée par la Lodge of
              Lights n° 148 à Warrington, [Fred L. PICK, Preston - The Gild and
              the Craft, in A.Q.C. LIX, 1946, p. 109] mentionne la tenue
              prescrite pour les Maçons participant à la Procession de la
              fameuse Preston Gfuild, le 2 septembre 1822: <br />
              ... tous les frères seront en costume Noirs, ... les Maçons
              symboliques ... (et) ... les Maçons de la Sainte Arche Royale
              porteront leurs Tabliers respectifs seulement. Les Chevaliers du
              Temple porteront un tablier de velours noir uni attaché par un
              ruban blanc, à la bavette de soie noire portant peints le crâne et
              les os en sautoir mais sans écharpe ni épée. <br />
              L'édition suivante des Statuts (1846), sous la grande maîtrise de
              KEMEYS TYNTE, ne prescrit plus que « revêtu des décors propres à
              l'Ordre ». <br />
              Une édition parut en 1853, probablement inspirée des Constitutions
              contemporaines de la Grande Loge Unie, disposant au chapitre
              "Décors" pour la première fois en plusieurs pages d'instructions
              très détaillées, des insigne [tablier], écharpe ou baudrier, épée,
              croix, plaque, cape ou manteau, crispins, et colliers et bijoux
              devant être portés par les officiers et anciens officiers. Elle
              contient aussi plusieurs illustrations des diverses formes de
              croix et des bijoux de fonctions. <br />
              Les écharpes, unies ou différenciées, sont exactement les mêmes
              que celles actuellement portées. Les colliers suspendant les
              bijoux de fonction étaient de même modèle de ruban que les
              écharpes. Mais d'autres décors devaient subir plus tard bien des
              modifications. <br />
              On peut voir aujourd'hui des expositions de décors anciens dans de
              nombreux temples présentant les tabliers de chevalier du Temple
              alors en usage. <br />
              En 1873 des propositions furent faites au Convent Général pour de
              profondes modifications des décors. Le tablier disparut, sauf pour
              ceux déjà reçus qui pouvaient continuer à le porter. Il fut aussi
              prévu une tunique, ainsi que des modifications au manteau pour
              distinguer les Précepteurs installés. Il semble aussi que les
              toques et leurs insignes distinctifs aient fait partie des
              nouveautés. <br />
              Vers la fin de l'époque du Convent Général, parmi les mesures qui
              furent promulguées pour éviter de prévenir un déclin désastreux,
              on trouve la réintroduction des badges de fonction sur le manteau.
              On ne sait quand ils furent introduits, mais ce fut certainement
              après 1853, puisque jusque-là ils étaient en métal, portés à la
              pointe du collier en sautoir. <br />
              La tenue actuelle prescrite dans les deux autres juridictions
              britanniques diffère peu de celle en usage en Angleterre: les
              tuniques, manteaux, toques, crispins, ceinturons et épées y sont
              de rigueur, sauf pour de nombreuses différences de détails,
              particulièrement en Écosse où la couleur de la coiffure change
              selon le rang. Le complément le plus intéressant, "souhaité" dans
              le règlement d'Écosse, consiste en bottes de daim, plus hautes que
              le genou, avec éperons d'or à lanières rouges. Ceux-ci ne sont en
              fait aujourd'hui portés que par le GM et les hauts dignitaires.{" "}
              <br />
              En Écosse, les Statuts de 1837 ne traitent que de l'ordre du
              Temple et ne font allusion à aucun autre grade maçonnique. Les
              décors prescrits sont très similaires à ceux portés dans l'ordre à
              ce jour (1948) sauf que les membres devaient porter « une fraise
              de percale et des pantalons blancs moulants ». <br />
              En 1856, les décors sont les mêmes que ceux de 1837, mais le
              tablier de Templier maçonnique peut être porté en lieu et place de
              la tunique et du manteau. Le tablier est brièvement décrit comme :
              blanc bordé ou entouré de noir, la bavette ou rabat triangulaire
              et noir, bordé de galon blanc ou argenté. Le Chevalier peut aussi
              porter une écharpe noire et l'étoile maçonnique (qui est argentée)
              avec neuf pointes. Une écharpe et une plaque étoilée similaires
              sont portées actuellement par les Chevaliers sous la juridiction
              du Grand Prieuré d'Angleterre. <br />
              En 1897 les décors sont modifiés : les pantalons blancs moulants
              et le col blanc à revers sont abandonnés. L'écharpe ou cordon,
              variant selon le rang, est introduite. Le rituel du Temple de
              1851, comme il fut plus tard imprimé, continua d'être utilisé par
              les Préceptories pendant les années sous le Convent Général, mais
              il est curieux de noter, dans l'édition de 1884, que la
              "modification récente" dans la titulature des officiers était
              mentionnée sur une page supplémentaire placée en tête de
              l'ouvrage. Elle nous indique des modifications spécifiquement dues
              au Convent Général, ainsi: le Commandeur devient Précepteur; le
              Premier Capitaine, Connétable; le Second Capitaine, Maréchal;
              l'Expert Député (ou Sous-) Maréchal; l'Économe, l'Enregistreur, le
              Capitaine des Lignes, l'Écuyer Extérieur et le Trésorier. Le
              Maréchal, comme Directeur des Cérémonies, n'était pas encore
              advenu, mais était alors ce que nous appelons de nos jours le
              Second Connétable. <br />
              En Angleterre, le retour à l'indépendance du Grand Prieuré donna
              lieu aux ultimes modifications dans le complément d'officiers, à
              tous niveaux, que nous connaissons aujourd'hui. <br />
              Le Grand Prieuré irlandais, assujetti au Convent Général de 1872 à
              1895, montre dans le grade du Temple, des grands officiers et
              officiers des Préceptories portant les mêmes titres et remplissant
              les mêmes fonctions que leurs homonymes au sein du Grand Prieuré
              d'Angleterre. Leurs positions dans une chapelle de l'ordre du
              Temple diffèrent quelque peu de celles habituelles en Angleterre
              et un Conducteur intervient dans l'escorte du candidat, comme dans
              une loge symbolique en Irlande. <br />
              Dans la juridiction templière écossaise, tant au niveau national
              ou provincial que local, la liste d'officiers comprend des titres
              inconnus en Angleterre ou en Irlande: une Préceptorie possède un
              Sous-Prieur, comparable au Député Maître d'une loge symbolique, et
              un Sénéchal, mais un seul Connétable. Le Porte-étendard (Baucens)
              est appelé "Baucenifère" et c'est un secrétaire qui assure les
              fonctions administratives. <br />
              Aux États-Unis, la principale curiosité des ordres Unis est qu'ils
              sont au nombre de trois au lieu de deux: l'Ordre Illustre de la
              Croix Rouge, l'ordre de Malte et l'ordre du Temple, dans cet
              séquence. <br />
              Traditionnellement le premier n'implique nullement l'adhésion à la
              foi chrétienne. Pratiqué en Écosse (Babylonish Pass ou Red Cross)
              au sein de « Loges et Conseils » attachés aux chapitres de l'Arche
              Royale et en Irlande au sein de l'ordre des Chevaliers Maçons
              administré par un Grand Conseil, ce grade présente une similitude
              avec certains degrés du Rite Écossais Ancien et Accepté et celui
              de la Croix Rouge de Babylone des Grades Maçonniques Alliés, ou
              encore le Chevalier d'Orient et d'Occident du Rite français.{" "}
              <br />
              Le rituel américain de l'ordre du Temple vient directement de la
              version anglaise contemporaine (premier tiers du XIXe siècle) mais
              des ajouts typiquement américains, essentiellement dans la vêture,
              à l'époque de la guerre de Sécession, ont donné la version
              actuelle. <br />
              Détailler les très nombreuses différences existantes entre usages
              européens et américains serait très long : La plus évidente réside
              dans les décors : aux États-Unis, les chevaliers portent une
              vareuse noire de style militaire et un bicorne à plume d'époque
              XIXe siècle appelé « chapeau [en français dans le texte], sinon
              une casquette ». Des propositions faites pour l'abandon de cet
              uniforme très onéreux, pour quelque chose de plus proche des
              usages britanniques ont conduit à autoriser le port d'un manteau
              et d'une toque sur un uniforme militaire moderne. <br />
              Le décor du grade de Malte n'est pas très différent de celui porté
              dans les îles britanniques et le rituel est assez semblable. Il
              existe toutefois une forme courte permettant aux grades de Malte
              et du Temple d'être conférés le même jour et cela semble être
              devenu la pratique la plus courante. Jusqu'en 1916, le grade du
              Temple précédait celui de Malte, les deux cérémonies étant alors
              pratiquées in extenso. <br />
              En 2007, à l'occasion de la Consécration de "La Rose de Sharon N°
              37", le Grand Prieuré pour la France a adopté une forme ancienne
              du rituel antérieurement usité aux États-Unis, à l'usage de ses
              Préceptories [alors intitulées Commanderies] souhaitant maintenir
              la pratique d'un rituel anglais primitif, source du rituel
              américain actuel.
            </p>
          </section>
          <section className="p-6 border-b border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <NavKT />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
