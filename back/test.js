import swisseph.*;
  import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;
import java.lang.*;
  public class SwissSample extends MIDlet implements CommandListener
{
 private Display display;
 private Form form;
 private Command exit;
 static final double AU2km=SweConst.AUNIT/1000;
        double[] res=new double[6];
        double[] res1=new double[6];
 double[] res2=new double[6];
 StringBuffer serr=new StringBuffer();
 StringBuffer serr1=new StringBuffer();
 StringBuffer serr2=new StringBuffer();

     
 public SwissSample()
 {
  display = Display.getDisplay(this);
  exit = new Command("Exit", Command.EXIT, 1);
  form = new Form("SwissEph");

  form.addCommand(exit);

  form.setCommandListener(this);
 }


// current tithi calculation start
   public int currtithi(double jd, double moonlon)
 {
  SwissEph sw = new SwissEph();

  int rc=sw.swe_calc_ut(jd,SweConst.SE_SUN,flags,sunlon,serr); // sun's geo. long.
    x=moonlon-sunlon[0];          // sun-moon elongation
  x=x-math.floor(x/360)*360;  // normalize elongation
  elong=x;
  ti=math.floor(elong/12);  // determine the current tithi number from 0 to 29
  return ti;
 }
  // tithi calculation ends here

// Naskhatra calculation starts
   public int currnaks(double ay, double moonlon)
 {
  tempmoon=(moonlon-ay);
  tempmoon-=math.floor(tempmoon/360)*360;
   n_nas=math.floor(tempmoon*0.075);
  return n_nas;
 }
  // Naskhatra Calculation Ends



  // tithi end / start time in JD

   public void tithi(jd,ti)
 {
  SwissEph sw = new SwissEph();
   n1=ti;
   len=12;
     jdt = jd;
  knv = math.floor(((jd - 2415020) / 365.25) * 12.3685);
    for  (int itit = n1  ; n1 + 2 ;itit++)
  {
   aspect = math.floor(len * itit);
   flag = 0;
     while (flag<1)
   {
    jd=jdt;
      int rc=sw.swe_calc_ut(jd,SweConst.SE_SUN,flags,res,serr);
    sunlon=res[0];
      int rc3=sw.swe_calc_ut(jd,SweConst.SE_MOON,flags,moonlon,serr);
      aaa=sunlon+aspect;
      aaa-=math.floor(aaa/360)*360;
      asp1 = aaa - moonlon[0];
    while (asp1 > 180)
    {
     asp1 -= 360;}
    while (asp1 < -180) {
     asp1 += 360;}
      flag = 1;
    if (math.abs(asp1) > 0.00001) {    // set the precision, if required, decrease, otherwise the device may get hanged
     jdt += (asp1 / (math.abs(moonlon[1])- 1)); flag = 0;}
   }
     if (itit==n1) {

      jds=jdt;

   }

   if (itit==n1+1) {
    jde=jdt;
     }
    }
  // jds gives the tithi start time in julian day (UT)
// jde gives the current tithi end time in jlday.... (with this u can apply timezone correction by jds or jde+tz/24
// u can convert them to date/time by proper function call and print the output here

 }

  // end of routine tithi end / start time in JD


  // routine Naskhatra end / start time in JD

 public void naks(julianday,n_naksh)
 {
  SwissEph sw = new SwissEph();
  jdt = julianday;
  for (inak = n_naksh ; n_naksh+1 ;inak+)
  {
   nn1 = inak*80/6;
   nn1-=math.floor(nn1/360)*360;
   flag = 0;
   while (flag < 1) {
      jd=jdt;

    int rc3=sw.swe_calc_ut(jd,SweConst.SE_MOON,flags,moonlon,serr); // calculate Moon's geo. Long.
    Lmoon0=moonlon[0];
      sw.swe_set_sid_mode(SweConst.SE_SIDM_LAHIRI,0,0);   // in vedic astro Lahiri is used
    double ay = sw.swe_get_ayanamsa_ut(jd);
      Lmoon0-=ay;
    Lmoon0-=math.floor(Lmoon0/360)*360;
      asp1 = nn1 - Lmoon0;
    if (asp1 > 180) { asp1 -= 360;}
    if (asp1 < -180) { asp1 += 360;}
    flag = 1;
    if (math.abs(asp1) > 0.000001) {
     jdt += (asp1 / moonlon[1]); flag = 0;
    }
   }
     if (inak = (n_naksh )) {
      jds=jd;
   }
     if (inak = (n_naksh + 1)) {
      jde=jd;
   }
  }

// jds gives the Naskhatra start time in julian day (UT)
// jde gives the current Naskhatra end time in jlday.... (with this u can apply timezone correction by jds or jde+tz/24
// u can convert them to date/time by proper function call and print the output here
   }

// end of routine Naskhatra end / start time in JD




  // your code starts here

 public void getDetails()
 {
    // declare suitable array
  String tithi[]={"Pratipad (Shukla)","Ditwia (Shukla)","Tritya (Shukla)","Choturthi (Shukla)","Panchami (Shukla)","Sasthi (Shukla)","Saptami (Shukla)","Astami (Shukla)","Navami (Shukla)","Dashami (Shukla)","Ekadashi (Shukla)","Dwadashi (Shukla)","Tryodoshi (Shukla)","Choturdoshi (Shukla)","Purnima (Shukla)","Pratipad (Krishna)","Ditwia (Krishna)","Tritya (Krishna)","Choturthi (Krishna)","Panchami (Krishna)","Sasthi (Krishna)","Saptami (Krishna)","Astami (Krishna)","Navami (Krishna)","Dashami (Krishna)","Ekadashi (Krishna)","Dwadashi (Krishna)","Tryodoshi (Krishna)","Choturdoshi (Krishna)","Amabasya (Krishna)"};
  String naks[]=  {"Asvini","Bharani" ,"Krittika" ,"Rohini", "Mrigsira" ,"Ardra","Punarvasu","Pushya","Aslesa","Magha","Purba Phalguni""Uttar Phalguni","Hasta","Mahishi","Chitra","Vyaghra","Swati","Mahishi","Vishakha","Vyaghra","Anuradha","Mrig","Jyestha","Mrig","Moola","Shwan","Purvasadha","Uttarasadha","Shravana","Dhanishtha","Shatbhisha","Purba Bhadrapad","Uttar Bhadrapad","Revati"} ;

  SweDate sd = new SweDate();
  SwissEph sw = new SwissEph();
                          
  double jd = sd.getJulDay();
                //double jd = sd.getJulDay(2000,1,1,3);

                sw.swe_set_topo(80.17,13.04,2);
                sw.swe_set_sid_mode(SweConst.SE_SIDM_LAHIRI,0,0);   // in vedic astro Lahiri is used
                double ay = sw.swe_get_ayanamsa_ut(jd);
                int flags = SweConst.SEFLG_SPEED | SweConst.SEFLG_TOPOCTR;


  int rc=sw.swe_calc_ut(jd,SweConst.SE_SUN,flags,res,serr);
        int rc1=sw.swe_calc_ut(jd,SweConst.SE_SATURN,flags,res1,serr1);
  int rc2=sw.swe_calc_ut(jd,SweConst.SE_JUPITER,flags,res2,serr2);
  int rc3=sw.swe_calc_ut(jd,SweConst.SE_MOON,flags,moonlon,serr); // calculate Moon's geo. Long.

  ti=currtithi(jd,moonlon[0]);     // tithi function call
  form.append("Now Tithi is "+tithi[ti]);    // display the current tithi
  tithi(jd,ti);     // Start and end time of current tithi
    n_nas=currnaks(ay,moonlon[0]);  // Call to Naskhatra Calculation
  form.append("Naskhatra (Star) is "+naks[n_nas]);    // display the current Naskhatra
  naks(jd,n_nas);    // Start and end time of current Naskhatra

                  form.append("Time now is "+sd.getDate(jd));
  form.append(
   sw.swe_get_planet_name(SweConst.SE_SUN)+":"+
   "&#92;n&#92;tLongitude:           "+res[0]);/*+
   "&#92;n&#92;tLatitude :           "+res[1]+
   "&#92;n&#92;tDistance :           "+res[2]+" AU"+
   "  ("+(res[2]*AU2km)+" km)"+
   "&#92;n&#92;tLongitudinal speed:  "+res[3]+" degs/day &#92;n");
    
  form.append("Date :  "+sd.getDate(jd));*/

                form.append(
   sw.swe_get_planet_name(SweConst.SE_SATURN)+":"+
   "&#92;n&#92;tLongitude:           "+res1[0]);

                form.append(
   sw.swe_get_planet_name(SweConst.SE_JUPITER)+":"+
   "&#92;n&#92;tLongitude:           "+res2[0]);

                form.append("Ayanamsa : "+ay);

                System.out.println(res[0]+"&#92;t"+res1[0]+"&#92;t"+res2[0]);
   }
   public void startApp()
 {
  getDetails();
  display.setCurrent(form);
 }
   public void pauseApp()
 {
 }

 public void destroyApp(boolean unconditional)
 {
 }
   public void commandAction(Command command, Displayable displayable)
 {
  if(command == exit)
  {
   destroyApp(false);
   notifyDestroyed();
  }
 }
}


