import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Privacy = () => {
  return (
    <ScrollView>
      <View style={styles.legalContainer}>
        <Text style={styles.legalHeader}>Privacy Policy</Text>
        <Text style={styles.legalText}>
          We respect the privacy of our users. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you
          visit our application. Please read this Privacy Policy carefully.
        </Text>
        <Text style={styles.legalText}>
          IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO
          NOT ACCESS THE APPLICATION
        </Text>
        <Text style={styles.legalText}>
          We reserve the right to make changes to this Privacy Policy at any
          time and for any reason. You are encouraged to periodically review
          this Privacy Policy to stay informed of updates. You will be deemed to
          have been made aware of, will be subject to, and will be deemed to
          have accepted the changes in any revised Privacy Policy by your
          continued use of the application after the date such revised Privacy
          Policy is posted.
        </Text>
        <Text style={styles.legalSubheader}>Collection of your data</Text>
        <Text style={styles.legalText}>
          We may collect information about you in a variety of ways. The
          information we may collect via the application depends on the content
          and materials you use, and includes:{' '}
        </Text>
        <Text style={styles.legalSubheader2}>Personal Data</Text>
        <Text style={styles.legalText}>
          Demographic and other personally identifiable information such as your
          name and email address that you voluntarily give to us when choosing
          to participate in various activities related to the application such
          as posting messages, liking posts and sending feedback. If you choose
          to share data about yourself via your profile, messaging or other
          interactive areas of the application, please be advised that all data
          you disclose in these areas is public and your data will be accessible
          to anyone who accesses the application.
        </Text>
        <Text style={styles.legalSubheader2}>Derivative Data</Text>
        <Text style={styles.legalText}>
          Information our servers automatically collect when you access the
          application, such as your native actions that are integral to the
          application as well as other interactions with the application and
          other users via server log files.
        </Text>
        <Text style={styles.legalText}>
          User information from social networking sites, including your name,
          your social network username, location, gender, birth date, email
          address, profile picture, and public data for contacts, if you connect
          your account to such social networks. This information may also
          include the contact information of anyone you invite to use and/or
          join the application.
        </Text>
        <Text style={styles.legalSubheader2}>Mobile Device Access</Text>
        <Text style={styles.legalText}>
          We may request access or permission to certain features from your
          mobile device, including your bluetooth, calendar, camera, contacts,
          microphone, reminders, sensors, SMS messages, social media accounts,
          storage and other features. If you wish to change our access or
          permissions, you may do so in your settings.
        </Text>
        <Text style={styles.legalSubheader2}>Mobile Device Data</Text>
        <Text style={styles.legalText}>
          Device information such as your mobile device ID number, model, and
          manufacturer, version of your operating system, phone number, country,
          location, and any other data you choose to provide.
        </Text>
        <Text style={styles.legalSubheader2}>Push Notifications</Text>
        <Text style={styles.legalText}>
          We may request to send you push notifications regarding your account
          or the application. If you wish to opt-out from receiving these types
          of communications, you may turn them off in your device settings.
        </Text>
        <Text style={styles.legalSubheader2}>Third Party Data</Text>
        <Text style={styles.legalText}>
          Information from third parties, such as personal information or
          network friends, if you connect your account to the third party and
          grant the application permission to access this information.
        </Text>
        <Text style={styles.legalSubheader}>Use of your data</Text>
        <Text style={styles.legalText}>
          Having accurate information about you permits us to provide you with
          an efficient and personal experience. We may use information collected
          about you via the application to create and manage your account, to
          contact you regarding your account, to enable communications with
          other users, to generate a personal profile, to increase the effiency
          of the application, to request feedback and to resolve and
          troubleshoot problems.
        </Text>
        <Text style={styles.legalSubheader}>Disclosure of your data</Text>
        <Text style={styles.legalText}>
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:{' '}
        </Text>
        <Text style={styles.legalSubheader2}>By Law or to Protect Rights</Text>
        <Text style={styles.legalText}>
          If we believe the release of information about you is necessary to
          respond to legal process, to investigate or remedy potential
          violations of our policies, or to protect the rights, property, and
          safety of others, we may share your information as permitted or
          required by any applicable law, rule, or regulation.
        </Text>
        <Text style={styles.legalSubheader2}>
          Interactions with Other Users
        </Text>
        <Text style={styles.legalText}>
          If you interact with other users, those users may see your name,
          profile photo, and descriptions of your activity.
        </Text>
        <Text style={styles.legalSubheader}>Tracking Technologies</Text>
        <Text style={styles.legalText}>
          We may use cookies, web beacons, tracking pixels, and other tracking
          technologies to help improve your experience. When you access the
          application, your personal information is not collected through the
          use of tracking technology. Most browsers are set to accept cookies by
          default. You can remove or reject cookies, but be aware that such
          action could affect the availability and functionality of the
          application. You may not decline web beacons. However, they can be
          rendered ineffective by declining all cookies or by modifying your
          browser settings.
        </Text>
        <Text style={styles.legalSubheader}>Third Party Websites</Text>
        <Text style={styles.legalText}>
          The application may contain links to third party websites and
          applications, including advertisements and external services that are
          not affiliated with us. Once you have used these links to leave the
          Application, any information you provide to these third parties is not
          covered by this Privacy Policy, and we cannot guarantee the safety and
          privacy of your information. Before visiting and providing any
          information to any third party websites, you should inform yourself of
          the privacy policies and practices of the third party responsible for
          that website, and should take those steps necessary to, in your
          discretion, protect the privacy of your information. We are not
          responsible for the content or privacy and security practices and
          policies of any third parties, including other sites, services or
          applications that may be linked to or from the application.
        </Text>
        <Text style={styles.legalSubheader}>Security of your data</Text>
        <Text style={styles.legalText}>
          While we have taken reasonable steps to secure the personal
          information you provide to us, please be aware that despite our
          efforts, no security measures are perfect or impenetrable, and no
          method of data transmission can be guaranteed against any interception
          or other type of misuse. Any information disclosed online is
          vulnerable to interception and misuse by unauthorised parties.
          Therefore, we cannot guarantee complete security if you provide
          personal information.
        </Text>
        <Text style={styles.legalSubheader}>Policy for children</Text>
        <Text style={styles.legalText}>
          We do not knowingly solicit information from children under the age of
          18. If you become aware of any data we have collected from children,
          please contact us.
        </Text>
        <Text style={styles.legalSubheader}>Options regarding your data</Text>
        <Text style={styles.legalSubheader2}>Account information</Text>
        <Text style={styles.legalText}>
          You may at any time review or change the information in your account
          or terminate your account by logging into your account settings and
          updating your account.
        </Text>
        <Text style={styles.legalSubheader2}>Communications</Text>
        <Text style={styles.legalText}>
          If you no longer wish to receive correspondence, emails, or other
          communications from us, you may opt out by logging into your account
          settings and updating your preferences. If you no longer wish to
          receive correspondence, emails, or other communications from third
          parties, you are responsible for contacting the third party directly.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Privacy;

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
