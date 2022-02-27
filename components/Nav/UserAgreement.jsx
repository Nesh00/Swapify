import { View, Text, StyleSheet, ScrollView } from 'react-native';

const UserAgreement = () => {
  return (
    <ScrollView>
      <View style={styles.legalContainer}>
        <Text style={styles.legalHeader}>User Agreement</Text>
        <Text style={styles.legalText}>
          Please help us to maintain the application as an open and enjoyable
          experience. If you see a listing that violates our rules, please
          report it to us.
        </Text>
        <Text style={styles.legalSubheader}>Rights to terminate</Text>
        <Text style={styles.legalText}>
          We may terminate any listing or use of the service immediately and
          without notice if we believe you have acted against this User
          Agreement or if we believe you have violated or attempted to violate
          the rights of other users.
        </Text>
        <Text style={styles.legalSubheader2}>Code of Conduct</Text>
        <Text style={styles.legalText}>
          You are solely responsible for the contents of your transmissions
          through the service. You must ensure that your participation in the
          swapping of items does not violate any applicable laws or regulations.
          In particular, you may not swap property which requires a written
          contract, which is illegal, which requires a licence to buy or sell
          (for instance firearms, alcohol or pharmaceutical drugs) or which
          requires you to obtain an export licence.
        </Text>
        <Text style={styles.legalText}>
          Pornographic material of any type may not be listed or exchanged using
          the app.
        </Text>
        <Text style={styles.legalText}>
          Recreational drug paraphernalia may not be listed or exchanged using
          the app.
        </Text>
        <Text style={styles.legalText}>
          Live animals may not be listed or exchanged using the app.
        </Text>
        <Text style={styles.legalText}>
          Weapons including knives, firearms or air powered guns or coshes may
          not be listed or exchanged using the app.
        </Text>
        <Text style={styles.legalText}>
          You must not transmit through the app any unlawful, harassing,
          abusive, threatening, harmful, vulgar, obscene or otherwise
          objectionable material. You must also not transmit any material that
          encourages conduct that could constitute a criminal offence, give rise
          to civil liability or otherwise violate any applicable law or
          regulation.
        </Text>
        <Text style={styles.legalText}>
          Listings for affiliate or pyramid schemes are not permitted. Any user
          found to be posting this type of listing may have their membership
          suspended or terminated.
        </Text>
        <Text style={styles.legalSubheader2}>Eligibility for membership</Text>
        <Text style={styles.legalText}>
          If you are under 18 years old, you can use this service only in
          conjunction with and under the supervision of a parent or guardian. If
          you do not qualify, please do not use our services.
        </Text>
        <Text style={styles.legalText}>
          Our application acts as a location for members to list and swap items.
          We have no involvement in any transaction between users. We have no
          control over the quality, safety or legality of the items listed, the
          truth or accuracy of the listings or the ability of users to complete
          swaps. In addition, please note that there could be risks associated
          with dealing with underage persons or people acting under false
          pretence.
        </Text>
        <Text style={styles.legalText}>
          There is no form of business or financial relationship between the
          application and any user of the application.
        </Text>
        <Text style={styles.legalText}>
          Users give us the right to exercise copyright and publicity rights
          over material displayed in listings.
        </Text>
        <Text style={styles.legalText}>
          Users agree not to make any unauthorised commercial use of the
          service.
        </Text>
        <Text style={styles.legalText}>
          We provide no guarantee that the service will meet your requirements,
          nor can we guarantee the accuracy or reliability of any information
          provided by other users and obtained through the app.
        </Text>
        <Text style={styles.legalText}>
          We are not involved in dealings between users and will not be liable
          to you or any third party for any indirect or consequential loss or
          damage.
        </Text>
        <Text style={styles.legalText}>
          We are not responsible or liable to anyone for the statements or
          conduct of users of the service.
        </Text>
        <Text style={styles.legalText}>
          Use of the service is at the user's own risk.
        </Text>
        <Text style={styles.legalText}>
          We are not responsible for any items obtained by swapping, for any
          damage to items during transit or for any misrepresentations by users.
        </Text>
        <Text style={styles.legalSubheader2}>Swap Stars</Text>
        <Text style={styles.legalText}>
          Swap Stars may be awarded by users following a swap. Swap Stars have
          no monetary value. We reserve the right to terminate or suspend
          membership if we reasonably believe that any member has violated or
          acted inconsistently with the rules of the Swap Stars system.
        </Text>
        <Text style={styles.legalSubheader2}>Communications</Text>
        <Text style={styles.legalText}>
          By accepting this User Agreement, you understand that we may send you
          notifications when other users make offers against listing you have
          made.
        </Text>
        <Text style={styles.legalSubheader2}>Modifications</Text>
        <Text style={styles.legalText}>
          We reserve the right to modify or discontinue the service if there is
          a change in the law or our operational requirements.{' '}
        </Text>
        <Text style={styles.legalSubheader2}>Laws</Text>
        <Text style={styles.legalText}>
          These Terms of Service shall be governed by and constructed in
          accordance with the laws of England and Wales and any disputes will be
          decided only by the Courts of England and Wales.
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserAgreement;

const styles = StyleSheet.create({
  legalContainer: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#fff',
  },
  legalHeader: {
    alignSelf: 'flex-start',
    marginBottom: '5%',
    fontSize: 25,
  },
  legalSubheader: {
    alignSelf: 'flex-start',
    marginBottom: '5%',
    fontSize: 20,
  },
  legalSubheader2: {
    alignSelf: 'flex-start',
    marginBottom: '5%',
    fontSize: 18,
  },
  legalText: {
    alignSelf: 'flex-start',
    marginBottom: '5%',
    fontSize: 16,
  },
});
