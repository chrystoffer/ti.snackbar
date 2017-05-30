var Snackbar = require('android.support.design.widget.Snackbar');
var OnClickListener = require('android.view.View.OnClickListener');
var View = require('android.view.View');
var Color = require('android.graphics.Color');

/**
 * Show the Snackbar for a short period of time.
 */
exports.SNACKBAR_LENGTH_SHORT = Snackbar.LENGTH_SHORT;

/**
 * Show the Snackbar for a long period of time.
 */
exports.SNACKBAR_LENGTH_LONG = Snackbar.LENGTH_LONG;

/**
 * Show the Snackbar indefinitely.
 */
exports.SNACKBAR_LENGTH_INDEFINITE = Snackbar.LENGTH_INDEFINITE;

/**
 * Make a Snackbar to display a message.
 * @param args The arguments passed to present a new message.
 */
exports.show = function(args) {
  var container = args.container;
  var message = args.message;
  var length = args.length;
  var action = args.action;
  var style = args.style;
  var actionTextColor = args.actionTextColor;
  var onActionClicked = args.onActionClicked;
  var onSnackbarShown = args.onSnackbarShown;
  var onSnackbarClicked = args.onSnackbarClicked;
  
  var snack = Snackbar.make(container, message, length);
  
  if (style == 'success')
    style = '#FF21AB29';
  if (style == 'warn')
    style = '#FFFF7f00';
  if (style == 'error')
    style = '#FFEE0000';
	if (style == 'info')
		style = '#FF0077EA';
  if (style != undefined)
    snack.getView().setBackgroundColor(Color.parseColor(style));
  
  if (onActionClicked && !action) {
      Ti.API.error('Specified \'onActionClicked\' without specifying \'action\'!');
  }

  if (actionTextColor && !action) {
      Ti.API.error('Specified \'actionTextColor\' without specifying \'action\'!');
  }
  
  if (action) {
    snack.setAction(action, new OnClickListener({
      onClick: function(v) {
        onActionClicked && onActionClicked();
      }
    }));
    
    if (actionTextColor) {
      snack.setActionTextColor(actionTextColor);
    }
  }
  
  // TODO: Update when library 25.x supported 
  // if (onSnackbarClicked || onSnackbarShown) {
  //     snack.addCallback(Snackbar.Callback.extend({
  //       onDismissed: function(transientBottomBar, event) {
  //         onSnackbarClicked && onSnackbarClicked();
  //       },
  //       onShown: function(transientBottomBar) {
  //         onSnackbarShown && onSnackbarShown();
  //       }
  //     }));
  // }
  
  snack.show();
};
