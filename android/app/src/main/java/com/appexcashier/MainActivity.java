package com.appexcashier;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.SplashTheme);
      super.onCreate(savedInstanceState);
  }
  @Override
  protected String getMainComponentName() {
    return "AppexCashier";
  }
}
