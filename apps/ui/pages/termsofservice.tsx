import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block-start: 3rem;
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 1rem;
  }
`;

const Text = styled.p`
  max-width: 1000px;
  display: inline-block;
  font-size: 18px;
  line-height: 24px;

  :after {
    content: '';
    width: 100%;
    height: 1em;
    display: inline-block;
  }
`;

const TermsConditions = () => {
  return (
    <Root>
      <Title>TERMS OF SERVICE</Title>
      <Text>
        Terms of Service for Moonpage (moonpage.io) Version 2022 Oktober 16th
      </Text>
      <Title>1 GENERAL</Title>
      <Text>
        These Terms of Service apply between the visitors of the website
        (hereinafter referred to as "User") of moonpage.io, (hereinafter
        referred to as "Website"), who make use of the services and content of
        the Website, and the operator of the Website, Moonpage, Germany
        (hereinafter referred to as "Operator"). Users who create a project on
        the website will be hereinafter referred to as "Creator".
      </Text>
      <Text>
        The aforementioned services are basically provided in a decentralized
        manner via smart contracts, which are available as open source. The
        Website provided by the Operator is a frontend that allows to
        communicate with the smart contracts. Users are generally free to
        operate their own frontend to interact with the smart contracts.
        Therefore, it is generally possible to contact the smart contracts
        without the frontend provided by the Operator.
      </Text>
      <Text>
        In order to interact on the website, the user must have a compatible
        wallet at a third party with funds in it to mint NFTs and/or to pay for
        the transaction fees of the Blockchain network. The Operator does not
        provide wallets to the User. The Operator may change the choice of
        compatible wallets from time to time. By clicking your consent (e.g.
        'Connect To Wallet') or by using our Services, you agree to these Terms.
      </Text>
      <Title>2 CREATING PROJECTS</Title>
      <Text>
        2.1. The website is a launchapd that empowers users to upload their text
        and sell it as NFTs. All NFTs are part of one collection called
        'Moonpage'. Creating requires a connection between the aforementioned
        wallet and the Website. In order to start the selling process of a
        project, the creator needs to claim at least 1 and maximum 4 nfts for
        themselves. The smart contract then transfers the NFTs to the user's
        wallet. The operator has at no time access to any tokens or NFTs
        belonging to the user.
      </Text>
      <Text>
        2.2. The creator determines the title of the text. If not provided in
        standard english letters, the display of the title will be broken. Once
        set into the smart contract, the title cannot be changed. Further, the
        creator determines the amount of the Genesis Edition of their
        collection, which can be a number between 10 and 1000. The creator also
        sets the starting price for the auction of each Genesis Edition NFT.
        Every item of the Genesis edition is sold in a reverse auction, where
        the starting price goes down to 0 during an hour. Per project only one
        auction for an NFT is running at a time. After the creator uploads the
        text, the website tries to determine the language of the text and the
        user may correct this detection if necessary. The languages available to
        choose from may change in the futures. Once the title, language, amount
        and price of the Genesis Edition are set into the contract, the project
        is created. The creating wallet address is saved as the creator's
        address. The creation of a project on Moonpage (smart contracts) cannot
        be reversed and the data set through creation is immutable.
      </Text>
      <Text>
        2.3. After the creation of a project, the creator may configure the
        project further. The configuration includes setting or changing any of
        the following data of a project: subtitle, genre, blurb, cover image and
        animation shown on NFT-marketplaces, translation (if the original text
        is not English) and contributors. Except for the contributors, any of
        the data mentioned can be changed, unless the project is frozen (see
        2.7.) by the creator themselves.
      </Text>
      <Text>
        2.4. After the creation of a project, the creator may set contributors
        to the project, by setting their wallet address, role and percentage of
        the share. Contributors can be translators, editors, publishing houses,
        co-authors, cover-artists, marketers or other users who have contributed
        to the project. It is possible to set up up to 3 different contributors
        and they may only be set by the creator. Once set, they are immutable.
        The distribution of funds to the contributors will be explained in 3.3.
      </Text>
      <Text>
        2.5. The complete work published through the operator (also including
        blurb, translation, cover image and animation etc.), hereinafter
        referred to as "project" must not contain any hateful content, potential
        copyright issue, plagiarism, illegal or illegitimate content or
        malicious links (hereinafter defined as "harmful content"). operator can
        freeze the project if it detects any harmful content, which will disable
        the distribution of any funds and will also disable further minting of
        the infringing project. In the event of doubt, the operator may at its
        discretion denylist any involved wallet address. Being denylisted
        prevents this wallet address from any further action on this platform.
        Neither the operator, nor the NFT owners of a project hold any
        copyright. The creator remains the owner of their content. Unless
        otherwise agreed in writing, by submitting, posting, or displaying
        content on or through the Services, Moonpage is granted a nonexclusive,
        royalty-free, worldwide, fully paid, and sublicensable license to use,
        reproduce, modify, adapt, publish, translate, create derivative works
        from, distribute, publicly perform and display your content and any
        name, username or likeness provided in connection with your content in
        all media formats and distribution methods now known or later developed
        on the Services.Moonpage needs this license to display the project
        across its various surfaces (i.e., mobile, web) without further
        permission.This type of license also is needed to distribute the content
        across Moonpage's services. For example, the creator creates a story nft
        and sells it on Moonpage. It is reproduced as versions on both our
        website and distributed to multiple places within Moonpage and
        Moonpage's social media sites. A modification might be that we show a
        snippet of the project (and not the full text) in a preview, with
        attribution to the creator. A derivative work might be a list of top
        projects or quotes on Moonpage that uses portions of a project, again
        with full attribution. This license applies to Moonopage services only,
        and does not grant us any permissions outside of Moonpage services.
      </Text>
      <Text>
        The operater may stop providing the services or any of its features at
        its sole discretion. The operator also retains the right to create
        limits on use and storage and may remove or limit content distribution
        on the services.
      </Text>
      <Text>
        2.6. In order for the auctions of a Genesis Edition to start, the
        creator needs to claim their own NFTs of thee project, a minimum of 1
        and maximum of 4 NFTs. Additionally, 1 NFT – the very first one of the
        project – goes to a wallet of the operator. The operator plans to use
        the collected NFTs for a future feature, but may it at its sole
        discretion.
      </Text>
      <Text>
        2.7. Once a project is created, meaning title, language, Genesis Edition
        amount and starting price have been set, the creation cannot be undone.
      </Text>
      <Text>
        2.8. As well as single projects as the whole Moonpage service set in the
        smart contract can be paused by the deploying wallet address of the
        operator and the operator may do so at any time at its sole discretion.
        The pausing of the whole project is an option for the operator to
        prevent overlooked security issues from being exploited (further). When
        Moonpage is paused, no one can create new projects and no new NFTs can
        be minted. Pausing a single project is an option for the operator to
        stop further minting of a project, if it proves to contain any harmful
        content (defined in 2.5.) and may do so at its sole discretion anytime.
        But pausing (whether a single project or the whole of Moonpage) will not
        stop further sales of already minted project on the secondary
        marketplaces and thus it cannot prevent royalties being earned and
        claimed continuously. The operator may at its discretion change set the
        curated flag for a certain project, in order to signal to users that
        Moonpage explicitly approves the content or style of a project's text.
        The creator may at their discretion change the frozen flag in the smart
        contract. Once set, it cannot be reversed. When a project is frozen none
        of the data of a project can be changed anymore (subtitle, cover-image
        etc.).
      </Text>
      <Title>3 MINTING PROJECTS</Title>
      <Text>
        3.1. Minting requires a connection between the user's wallet and the
        Website. When minting during the auction of a Genesis Edition the
        minting price is dynamic because it is constantly going down. Before
        minting the user can inquire the current price and when they click on
        "mint" the minting transaction is triggered with the price shown in the
        latest inquiry, even when the minimum price needed has gone down in the
        meantime. All edition after the Genesis Edition are sold with a fixed
        price and multiple NFTs can be minted at once. When the funds of a
        user's minting wallet are insufficient, transactions will be reverted.
        Moonpage is not liable for failed or wrong transactions caused by the
        underlying blockchain.
      </Text>
      <Text>
        3.2. Moonpage is not liable for the content of the NFTs on this
        platform. Users must be aware that they are solely responsible for NFT
        purchases on Moonpage and that the content being represented by an NFT
        can be changed by the creating wallet address (unless the project is
        frozen) or that the project can be paused. The operator recommends uers
        to do their own research before minting NFTs or interacting with the
        website in any other way. Neither Moonpage, nor the users who own an NFT
        are owner of the original text. The copyright remains with the author
        with the exceptions mentioned in 2.5. Hence, the creator of project of
        the NFT may further publish the content of this project.
      </Text>
      <Text>
        3.3. The funds collected from minting are locked inside the Moonpage
        Collection smart contract and are only distributed when an edition sells
        out. There is no way for the creator to access the funds earlier. The
        funds are distributed depending on the contributors set for the project.
        If no contributors are specified, 15% of the funds go to a wallet of
        operator and the remaining 85% go to the creator. If contributors are
        specified, the 85% originally reserved for the creator are further split
        among the contributors. E.G. The creator added two contributors, an
        editor who gets 20% and a cover artist getting 10%. Then the split is
        the following: Moonpage 15%, creator 55%, editor 20% and cover artist
        10%.
      </Text>
      <Text>
        3.4. As mentioned in 3.3. the funds are locked inside the Collection
        contract, but the deploying wallet of the operator may at its discretion
        do emergency withdrawals. This should only happen in cases when an
        attacker is draining the funds through an overlooked security issue and
        an emergency withdrawal is the only way to protect the remaining funds
        for the creators.
      </Text>
      <Text>
        3.4. In the future, the operator plans to implement the feature of
        royalties. Creators will be able to claim royalties for their project's
        NFT secondary sales on marketplaces. The royalty fee of 7% is paid by
        the purchasing address. 30% of the 7% fee will be claimable by a wallet
        of the operator and the remaining 70% will be claimable by the creator
        address.
      </Text>
      <Title>4 RISKS</Title>
      <Text>4.1. GENERAL INFORMATION</Text>
      <Text>
        4.1.1. The User acknowledges and agrees that especially the following –
        not conclusively shown – risks exist with regard to the use of the
        services provided on the Website.
      </Text>
      <Text>
        4.1.2. The risks listed below represent the risks considered material at
        the time this document was prepared. All risks presented individually
        can also occur cumulatively or to a particularly high degree and thus
        reinforce the negative effects on the respective User. General negative
        circumstances, such as a global financial, currency and/or economic
        crisis, may also occur and intensify the risk consequences. The personal
        and economic circumstances of a User cannot be taken into account below
        and can lead to individual risks for the User in question and/or
        increase the risks listed below.
      </Text>
      <Text>
        4.1.3. No statement can be made as to the probability that the risks
        described below will occur. Nor is the order of the risks presented
        below a measure for their probability of occurrence or for the extent of
        their potential impact. For the sake of clarity, the following
        presentation is thematically structured, whereby it must be noted that
        the risks mentioned may also have cross-thematic relevance and/or may
        affect the occurrence and intensity of other risks. Irrespective of the
        risks described here, developments that are unknown and/or unforeseeable
        today may have a negative impact on all NFTs issued through Moonpage
        services. The risks described below may cause the value of the NFTs, to
        develop negatively and lead to a partial or complete loss of the
        invested capital.
      </Text>
      <Text>4.2. DECREASE IN VALUE; TOTAL LOSS RISK; TECHNOLOGICAL RISKS</Text>
      <Text>
        4.2.1 There is no guarantee that the value of the NFT will be stable or
        rise. Since the crypto market is volatile the value of the NFT can
        significantly drop, as well as the token value of the blockchain used,
        in this case the MATIC token.
      </Text>
      <Text>4.2.2. If planned future feature cannot be</Text>
      realized or cannot be realized as currently planned, this may reduce or
      completely eliminate the value of the NFTs.{' '}
      <Text>
        4.2.3. Furthermore the tokens and NFTs are based on modern crypto
        technology that is still in an early development stage and not long
        proven. This may have negative effects to the value of both.{' '}
      </Text>
      <Text>4.3. RISKS REGARDING TOKEN SELLING; RISKS OF FRAUD</Text>
      <Text>
        4.3.1. The User may be unable to sell the received Tokens or the NFTs.
      </Text>
      <Text>
        4.3.2. The User is aware that token and NFT trading in general may be
        carried out by third party exchanges that eventually are not or almost
        not covered by the regulation and therefore, may be subject, inter alia,
        to fraudulent manipulations.
      </Text>
      <Text>
        4.4. REGULATION, RISKS REGARDING SUPERVISORY LAW REQUIREMENTS,
        PROTECTION OF INVESTORS
      </Text>
      <Text>
        4.4.1. The User is aware that the regulatory requirements of German
        supervisory law especially regarding NFTs and token in general and
        decentralized finance models have not been clarified (conclusively) and
        could be, therefore, subject to future legislations and/or regulations
        by German supervisory authorities. In particular, the German Federal
        Financial Supervisory Authority (Bundesanstalt für
        Finanzdienstleistungsaufsicht – "BaFin") could therefore possibly
        intervene in the future.
      </Text>
      <Text>
        4.4.2. Especially NFTs and tokens and decentralized finance models in
        general may also be influenced by European legislation. Parts of these
        term and conditions or these entire Terms of Service may thereby become
        invalid or void or be made dependent on additional requirements or
        conditions which make an adjustment of these Terms of Service necessary.
        Thus, there is a risk that the services provided on the Website, must be
        modified or stopped in the future due to German or European supervisory
        law. As a result, the tokens and NFTs may have no value and the User may
        lose all the invested capital.
      </Text>
      <Text>4.5. TAX RISKS </Text>
      <Text>
        4.5.1. Potential tax consequences arising at the level of the tokens
        depend on the individual tax situation of the respective User.
      </Text>
      <Text>
        4.5.2. The respective User should seek individual tax advice prior using
        the services provided on the Website. Therefore, each User is
        responsible for its own tax obligations. 4.6. BUSINESS RISKS It could
        turn out that the business concept of the Operator does not work and
        that the services provided on the Website have a lower demand than
        expected. As a result, the NFTs may have no value and the User may lose
        all the invested capital.
      </Text>
      <Text>
        4.6. RISKS IN CONNECTION WITH BUSINESS PARTNERS There is a risk that
        business partners of the Operator may interrupt, terminate or delay
        services that are mandatory for services provided on the Website. This
        could especially have negative impact to the Website and/or on the value
        of the NFTs.
      </Text>
      <Text>
        4.7. RISKS REGARDING MARKET PARTICIPANTS; NO LEGAL PROTECTION OF
        ALGORITHM
      </Text>
      <Text>
        4.7.1. There is a risk that other market participants will find out the
        underlying specifications of the NFTs (e.g. algorithm or concept in
        cryptography) and will offer comparable products with the same algorithm
        on the market. This may have negative effects to the value of the
        Tokens.
      </Text>
      <Text>4.8. RISKS REGARDING THE USER'S WALLET </Text>
      <Text>
        4.8.1. The NFTs and tokens may cause issues with negative effects
        regarding the User's wallet. This could lead to a complete loss of the
        User's Tokens. Ensuring the security of the wallet is the sole
        responsibility of the User.
      </Text>
      <Text>
        4.8.2. The Operator is not responsible for any losses resulting from the
        User losing the private key of the wallet.
      </Text>
      <Text>
        4.8.3. RISKS OF HACKING, SECURITY WEAKNESS AND OTHER ATTACKS Since it is
        possible that the Operator may be subject of hacking, e.g.
        malware-attacks, denial of service-attacks, smurfing, spoofing or may
        suffer from any other security weakness, there is a risk that such
        operations may have an negative impact on the services provided on the
        Website and/or the value of the NFTs.
      </Text>
      <Text>4.8.4. RISKS OF BANKRUPTCY AND LIQUIDATION OF THE OPERATOR </Text>
      <Text>
        4.8.5. As (not conclusively) set out in this section, there are several
        risks regarding e.g. the business relationships that may have an impact
        on the solvency of the Operator and might lead into a liquidation of the
        Operator.
      </Text>
      <Text>
        4.8.6. Under no circumstances does the Operator offer any kind of
        capital guarantee. The Operator does not belong to any deposit insurance
        system.
      </Text>
      <Text>
        4.8.7. In the event of insolvency, the Website can no longer be hosted
        by the Operator. This may have a negative impact on the value of the
        NFTs.
      </Text>
      <Text>4.9. MARKETING & DISSEMINATION/DEMAND </Text>
      <Text>
        The success of the NFTs depends on their dissemination or demand.
        Theoretically, the implemented marketing measures might show no effects
        and no Users are able to be generated. In this case, the corporate
        capital of the Operator would eventually come to an end. This would make
        further marketing measures financially impossible. This would probably
        lead to a long-term drop in value regarding the NFTs.
      </Text>
      <Text>4.10. KEY INDIVIDUALS RISK </Text>
      <Text>
        4.10.1 The development and economic success of the NFTs and/or the
        Website depend to a large extent on the experience and competence of a
        small group of people, in particular certain employees of the Operator
        and third parties. There is a risk that these key persons may not be
        available or not perform their tasks (fully or properly) and that the
        development or economic success of the Tokens and/or the Website may
        deteriorate or even be terminated.
      </Text>
      <Text>
        4.10.2 There is also the risk that a successor cannot be found in the
        event of the loss of a key person.
      </Text>
      <Text>4.5. RISK FROM CONFLICTS OF INTEREST </Text>
      <Text>
        4.5.1. There are personnel and capital links between the partners
        involved in this project. Participating partners and consultants are not
        subject to a non-competition clause. Therefore, it cannot be ruled out
        that the partners involved as well as the persons associated with them
        will carry out further projects with similar criteria in the future.
        Irrespective of this, there is a risk that the participating partners
        will take measures or refrain from necessary actions due to their own or
        external interests and/or that decision-making situations will be
        resolved to the detriment of this project.
      </Text>
      <Text>
        4.6. INSOLVENCY RISK/LACK OF DEPOSIT PROTECTION/NO CAPITAL GUARANTEE
      </Text>
      <Text>
        4.6.1. The business activities of the Operator represent an
        entrepreneurial commitment involving all risks of participation in
        business transactions. A company in general is always exposed to the
        risk of insolvency.
      </Text>
      <Text>
        4.6.2. Under no circumstances does the Operator offer a capital
        guarantee.
      </Text>
      <Text>
        4.6.3. Due to lower income and/or higher expenses, the Operator may
        become insolvent or over indebted. The Operator does not belong to any
        deposit insurance system. In the event of insolvency, this may have a
        negative impact to the Website and/or on the value of the NFTs.
      </Text>
      <Text>4.7. NO GUARANTEE OF TRADABILITY</Text>
      <Text>
        4.7.1.The NFTs shall be tradable on regulated exchanges. However, there
        is no guarantee that a sale will be possible at all, at the desired time
        or at the desired conditions.
      </Text>
      <Text>
        4.7.2.NO RIGHT TO A SAY/NO PAYMENT CLAIMS The NFTs do not provide any
        payment claims and/or co-determination rights under company law. It is
        therefore possible that the Operator will make decisions which do not
        correspond to the objectives of the individual Users and which may have
        a negative effect on them.
      </Text>
      {/* 7.18. CONTRACT PERFORMANCE RISK (COUNTERPARTY RISK) */}
      <Text>4.8. REPUTATIONAL RISK </Text>
      <Text>
        4.8.1. It is possible that the reputation of especially the NFTs may
        deteriorate with individual interest groups or in society as a whole,
        e.g. due to a large number of unrealized projects, fraudulent or other
        erroneous behavior or serious technical inadequacies (e.g. security
        gaps, hacks, data loss). As a result, but also as a result of
        corresponding events at the level of the Operator, the reputation of the
        Operator in terms of performance, competence, integrity and
        creditworthiness can also suffer.
      </Text>
      <Text>
        4.8.2. A deterioration in a company's reputation typically has a
        detrimental effect on the customer base and the company's business
        actions.
      </Text>
      <Title>5 LIABILITY </Title>
      <Text>
        5.1. Any liability of the Operator that is not expressly provided below
        shall be disclaimed.
      </Text>
      <Text>
        5.2. The Operator shall be liable for any damages of the User, no matter
        for what legal reasons, in case of willful intent and gross negligence
        only.
      </Text>
      <Text>
        5.3. The Operator shall be liable in case of ordinary negligence only
        for damages resulting from a breach of a material contractual obligation
        (material obligation, without the fulfillment of which the proper
        implementation of the purpose of this contract is not possible and on
        the fulfillment of which the User can regularly rely). This does not
        apply in case of injury to life, body or health.
      </Text>
      <Text>
        5.4. Except in case of intentional breach of contract, the liability of
        the Operator is limited to the amount of damages typically foreseeable.
        This does not apply to injuries to life, body or health or in case of
        gross negligence. The User is obliged to notify the Operator about
        special risks, atypical potential of damages and potential exceptional
        loss or in case of subsequent emergence.
      </Text>
      <Text>
        5.5. Section 8 shall not apply with indispensable statutory liability,
        particularly culpable injury to life, body or health, as well as in the
        case of fraudulent concealment of a defect or acceptance of a legal
        guarantee for the condition of the goods or the liability according to
        the German Product Liability Act (Produkthaftungsgesetz).
      </Text>
      <Text>
        8.6. For the sake of clarification it shall be understood that the
        liability between the Operator and the User shall in no event be
        influenced by incidents arising outside the technical sphere of the
        Operator (e.g. wallet service providers).
      </Text>
      <Title>5 AMENDMENTS</Title>
      <Text>
        Amendments We may make changes to these Terms from time to time. If we
        make changes, we’ll provide you with notice of them by sending an email
        to the email address associated with your account, offering an
        in-product notification, or updating the date at the top of these Terms.
        Unless we say otherwise in our notice, the amended Terms will be
        effective immediately, and your continued use of our Services after we
        provide such notice will confirm your acceptance of the changes. If you
        don’t agree to the amended Terms, you must stop using our Services.
      </Text>
      <Title>6 SEVERABILITY</Title>
      <Text>
        If any provision or part of a provision of these Terms is unlawful, void
        or unenforceable, that provision or part of the provision is deemed
        severable from these Terms and does not affect the validity and
        enforceability of any remaining provisions.
      </Text>
    </Root>
  );
};

export default TermsConditions;
