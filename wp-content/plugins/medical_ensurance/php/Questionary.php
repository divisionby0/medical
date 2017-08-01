<?php

class Questionary
{
    private $pluginDir;

    public function __construct($pluginDir){
        $this->pluginDir = $pluginDir;
        $this->registerJSScripts();
    }
    
    private function registerJSScripts(){

        wp_enqueue_style( 'wysiwygEditorCss', $this->pluginDir.'/js/libs/wysiwyg/summernote/summernote.css', false );
        
        wp_enqueue_script("jquery");
        wp_enqueue_script('wysiwygEditor', $this->pluginDir.'/js/libs/wysiwyg/summernote/summernote.js');

        wp_enqueue_script('79301_28133', $this->pluginDir.'/js/questionairy/app/views/element/treeView/BootstrapTreePatch.js');
        wp_enqueue_script('bootstrapTreeView', $this->pluginDir.'/js/libs/bootstrap-treeview/src/js/bootstrap-treeview.js');

        wp_enqueue_script('30748_92974', $this->pluginDir.'/js/questionairy/app/BaseApplication.js');
        wp_enqueue_script('58978_41055', $this->pluginDir.'/js/questionairy/app/Application.js');
        wp_enqueue_script('8960_15727', $this->pluginDir.'/js/questionairy/app/frontend/view/NodeTreeRenderer.js');

        wp_enqueue_script('34256_87520', $this->pluginDir.'/js/questionairy/questions/collection/CollectionEventDispatcher.js');
        wp_enqueue_script('80754_44160', $this->pluginDir.'/js/questionairy/questions/collection/SortableCollection.js');

        wp_enqueue_script('61868_69052', $this->pluginDir.'/js/questionairy/questions/collection/CollectionEventType.js');
        wp_enqueue_script('80767_13582', $this->pluginDir.'/js/questionairy/questions/collection/QuestionsCollection.js');
        wp_enqueue_script('7793_2839', $this->pluginDir.'/js/questionairy/questions/collection/RemoveCollectionItem.js');
        wp_enqueue_script('93811_90695', $this->pluginDir.'/js/questionairy/questions/collection/RemoveQuestion.js');

        wp_enqueue_script('71325_28044', $this->pluginDir.'/js/questionairy/app/frontend/answer/AnswerRenderer.js');
        wp_enqueue_script('57504_39594', $this->pluginDir.'/js/questionairy/app/frontend/answer/BooleanAnswerRenderer.js');
        wp_enqueue_script('66581_41858', $this->pluginDir.'/js/questionairy/app/frontend/answer/TextInputAnswerRenderer.js');
        wp_enqueue_script('81140_26024', $this->pluginDir.'/js/questionairy/app/frontend/answer/DateAnswerRenderer.js');
        wp_enqueue_script('85595_46032', $this->pluginDir.'/js/questionairy/app/frontend/answer/MultipleSelectionAnswerRenderer.js');
        wp_enqueue_script('87765_82882', $this->pluginDir.'/js/questionairy/app/frontend/answer/SingleSelectionAnswerRenderer.js');

        // PDF
        wp_enqueue_script('576_r__39594', $this->pluginDir.'/js/questionairy/app/frontend/answer/pdf/NodeTreeRendererPDF.js');
        wp_enqueue_script('57657804_39594', $this->pluginDir.'/js/questionairy/app/frontend/answer/pdf/AnswerRendererPDF.js');
        wp_enqueue_script('576504_3953494', $this->pluginDir.'/js/questionairy/app/frontend/answer/pdf/BooleanAnswerRendererPDF.js');
        wp_enqueue_script('04604_3953494', $this->pluginDir.'/js/questionairy/app/frontend/answer/pdf/TextInputAnswerRendererPDF.js');
        wp_enqueue_script('04_3953494', $this->pluginDir.'/js/questionairy/app/frontend/answer/pdf/TextViewAnswerRendererPDF.js');
        
        wp_enqueue_script('77839_45787', $this->pluginDir.'/js/questionairy/app/frontend/answer/TextViewAnswerRenderer.js');
        wp_enqueue_script('17042_75891', $this->pluginDir.'/js/questionairy/app/frontend/collection/FormatCollection.js');
        wp_enqueue_script('58466_70082', $this->pluginDir.'/js/questionairy/app/frontend/IFactory.js');

        wp_enqueue_script('34873_53517', $this->pluginDir.'/js/questionairy/app/frontend/question/QuestionRenderer.js');
        wp_enqueue_script('83626_92694', $this->pluginDir.'/js/questionairy/app/frontend/question/TextInputQuestionRenderer.js');

        wp_enqueue_script('75718_5342', $this->pluginDir.'/js/questionairy/app/frontend/question/boolean/BooleanQuestionRenderer.js');
        wp_enqueue_script('11672_73940', $this->pluginDir.'/js/questionairy/app/frontend/question/boolean/CreateBooleanQuestionChildren.js');
        //wp_enqueue_script('11667_7394082', $this->pluginDir.'/js/questionairy/app/frontend/question/boolean/CreateBooleanQuestionChildrenPDF.js');

        wp_enqueue_script('42716_10329', $this->pluginDir.'/js/questionairy/app/frontend/question/DateSelectQuestionRenderer.js');
        wp_enqueue_script('41944_33555', $this->pluginDir.'/js/questionairy/app/frontend/question/IUserAnswer.js');
        wp_enqueue_script('20283_62546', $this->pluginDir.'/js/questionairy/app/frontend/question/MultipleSelectionQuestionRenderer.js');
        wp_enqueue_script('34803_13702', $this->pluginDir.'/js/questionairy/app/frontend/question/QuestionAnswerChangedEventType.js');

        wp_enqueue_script('43718_6755', $this->pluginDir.'/js/questionairy/app/frontend/question/SingleSelectionQuestionRenderer.js');

        wp_enqueue_script('75082_9579', $this->pluginDir.'/js/questionairy/app/frontend/question/TextViewQuestionRenderer.js');
        wp_enqueue_script('14897_18523', $this->pluginDir.'/js/questionairy/app/frontend/RendererFactoryClass.js');
        wp_enqueue_script('46545_2186', $this->pluginDir.'/js/questionairy/app/frontend/RendererType.js');
        wp_enqueue_script('22065_26655', $this->pluginDir.'/js/questionairy/app/frontend/UserAnswersRendererFactory.js');

        wp_enqueue_script('22065_245655', $this->pluginDir.'/js/questionairy/app/frontend/PDFAnswersRendererFactory.js');

        wp_enqueue_script('52694_4653', $this->pluginDir.'/js/questionairy/app/frontend/UserAnswersValidator.js');
        wp_enqueue_script('2638_8659', $this->pluginDir.'/js/questionairy/app/frontend/UserQuestionsRendererFactory.js');
        wp_enqueue_script('83882_79521', $this->pluginDir.'/js/questionairy/app/frontend/variation/BooleanAnswerVariationRenderer.js');
        wp_enqueue_script('10543_11831', $this->pluginDir.'/js/questionairy/app/frontend/view/IDataRenderer.js');

        wp_enqueue_script('8473_76166', $this->pluginDir.'/js/questionairy/app/frontend/view/VariationRendererFactory.js');
        wp_enqueue_script('50703_77112', $this->pluginDir.'/js/questionairy/app/FrontendUserQuestions.js');

        wp_enqueue_script('9329_78028', $this->pluginDir.'/js/questionairy/app/FrontendUserAnswers.js');
        wp_enqueue_script('9329_78026666', $this->pluginDir.'/js/questionairy/app/UserAnswersPDFView.js');

        wp_enqueue_script('53959_23634', $this->pluginDir.'/js/questionairy/app/loader/FileLoader.js');
        wp_enqueue_script('81002_11774', $this->pluginDir.'/js/questionairy/app/loader/FileLoaderEventType.js');
        wp_enqueue_script('70818_16646', $this->pluginDir.'/js/questionairy/app/saver/FileSaver.js');
        wp_enqueue_script('77168_70328', $this->pluginDir.'/js/questionairy/app/saver/FileSaverEventType.js');
        wp_enqueue_script('64581_937', $this->pluginDir.'/js/questionairy/app/saver/SaveFile.js');
        wp_enqueue_script('48241_43638', $this->pluginDir.'/js/questionairy/app/TypeSelectElementData.js');

        wp_enqueue_script('5929_8292', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/wysiwygEditor/WYSIWYGEditor.js');
        wp_enqueue_script('79433_9270', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/TextEditableDialogContent.js');
        wp_enqueue_script('43923_43894', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/WYSIWYGDialogContent.js');

        wp_enqueue_script('64835_15719', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/AnswerCreationDialogContent.js');
        wp_enqueue_script('81254_39971', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/EditNodeDialogContent.js');
        wp_enqueue_script('89676_24318', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/PlaceholderInputElement.js');
        wp_enqueue_script('15230_49171', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/QuestionCreateDialogContent.js');
        wp_enqueue_script('87896_68093', $this->pluginDir.'/js/questionairy/app/views/element/dialog/content/RemoveNodeConfirmationDialogContent.js');

        wp_enqueue_script('97074_6745', $this->pluginDir.'/js/questionairy/app/views/element/dialog/Dialog.js');
        wp_enqueue_script('31347_76401', $this->pluginDir.'/js/questionairy/app/views/element/dialog/CreateAnswerDialog.js');
        wp_enqueue_script('75016_51567', $this->pluginDir.'/js/questionairy/app/views/element/dialog/CreateQuestionDialog.js');

        wp_enqueue_script('62296_51599', $this->pluginDir.'/js/questionairy/app/views/element/dialog/EditNodeDialog.js');
        wp_enqueue_script('7459_47058', $this->pluginDir.'/js/questionairy/app/views/element/dialog/RemoveNodeConfirmationDialog.js');
        wp_enqueue_script('69600_52254', $this->pluginDir.'/js/questionairy/app/views/element/dialog/WYSIWYGTestDialog.js');
        wp_enqueue_script('90197_56915', $this->pluginDir.'/js/questionairy/app/views/element/IDestroable.js');
        wp_enqueue_script('38439_81990', $this->pluginDir.'/js/questionairy/app/views/element/IHtmlElement.js');
        wp_enqueue_script('61357_82162', $this->pluginDir.'/js/questionairy/app/views/element/NodeDialogEventType.js');
        wp_enqueue_script('64280_41868', $this->pluginDir.'/js/questionairy/app/views/element/select/Select.js');
        wp_enqueue_script('35575_59142', $this->pluginDir.'/js/questionairy/app/views/element/select/SelectEventType.js');
        wp_enqueue_script('52743_73235', $this->pluginDir.'/js/questionairy/app/views/element/textInput/TextInput.js');

        wp_enqueue_script('81891_18598', $this->pluginDir.'/js/questionairy/app/views/element/treeView/LoadedDataTreeView.js');
        wp_enqueue_script('85838_74032', $this->pluginDir.'/js/questionairy/app/views/element/treeView/ManualTreeView.js');
        wp_enqueue_script('87432_65860', $this->pluginDir.'/js/questionairy/app/views/element/treeView/TreeViewEventType.js');

        wp_enqueue_script('79139_69567', $this->pluginDir.'/js/questionairy/questions/parsers/AnswerParser.js');
        wp_enqueue_script('26296_80102', $this->pluginDir.'/js/questionairy/questions/parsers/SingleSelectionAnswerParser.js');
        wp_enqueue_script('69380_76485', $this->pluginDir.'/js/questionairy/questions/parsers/TextInputAnswerParser.js');
        wp_enqueue_script('19264_11054', $this->pluginDir.'/js/questionairy/questions/parsers/AnswerParserFactory.js');
        wp_enqueue_script('96389_69937', $this->pluginDir.'/js/questionairy/questions/parsers/AnswerVariationsParser.js');
        wp_enqueue_script('56900_10687', $this->pluginDir.'/js/questionairy/questions/parsers/BooleanAnswerParser.js');
        wp_enqueue_script('69254_79554', $this->pluginDir.'/js/questionairy/questions/parsers/DateSelectionAnswerParser.js');
        wp_enqueue_script('45016_38734', $this->pluginDir.'/js/questionairy/questions/parsers/IAnswerParser.js');
        wp_enqueue_script('52984_73382', $this->pluginDir.'/js/questionairy/questions/parsers/MapParser.js');
        wp_enqueue_script('60960_94617', $this->pluginDir.'/js/questionairy/questions/parsers/MultipleSelectionAnswerParser.js');
        wp_enqueue_script('56777_71261', $this->pluginDir.'/js/questionairy/questions/parsers/ObjectType.js');
        wp_enqueue_script('71121_39220', $this->pluginDir.'/js/questionairy/questions/parsers/ObjectTypeStringFormatter.js');
        wp_enqueue_script('48946_38298', $this->pluginDir.'/js/questionairy/questions/parsers/QuestionCollectionParser.js');
        wp_enqueue_script('57162_16730', $this->pluginDir.'/js/questionairy/questions/parsers/QuestionParser.js');

        wp_enqueue_script('8146_38141', $this->pluginDir.'/js/questionairy/questions/parsers/TextViewAnswerParser.js');
        wp_enqueue_script('34099_2911', $this->pluginDir.'/js/questionairy/questions/question/CreateQuestion.js');

        wp_enqueue_script('51343_93890', $this->pluginDir.'/js/questionairy/questions/answer/Answer.js');
        wp_enqueue_script('53203_35062', $this->pluginDir.'/js/questionairy/questions/answer/textAnswer/TextInputAnswer.js');
        wp_enqueue_script('20358_27631', $this->pluginDir.'/js/questionairy/questions/answer/textAnswer/TextViewAnswer.js');
        wp_enqueue_script('37324_71050', $this->pluginDir.'/js/questionairy/questions/answer/AnswerFactory.js');

        wp_enqueue_script('60166_52129', $this->pluginDir.'/js/questionairy/questions/answer/booleanAnswer/BooleanAnswer.js');
        wp_enqueue_script('71878_41528', $this->pluginDir.'/js/questionairy/questions/answer/dateSelectionAnswer/DateSelectionAnswer.js');
        wp_enqueue_script('80333_25603', $this->pluginDir.'/js/questionairy/questions/answer/multipleSelectionAnswer/MultipleSelectionAnswer.js');
        wp_enqueue_script('79131_89475', $this->pluginDir.'/js/questionairy/questions/answer/RemoveAnswerVariation.js');
        wp_enqueue_script('82337_47087', $this->pluginDir.'/js/questionairy/questions/answer/singleSelectionAnswer/SingleSelectionAnswer.js');

        wp_enqueue_script('68400_34581', $this->pluginDir.'/js/questionairy/questions/answer/variation/AnswerVariation.js');

        wp_enqueue_script('19997_55510', $this->pluginDir.'/js/questionairy/questions/ICompositeNode.js');
        wp_enqueue_script('66102_16078', $this->pluginDir.'/js/questionairy/questions/node/CollectionChangeOrderListener.js');
        wp_enqueue_script('74759_98545', $this->pluginDir.'/js/questionairy/questions/node/create/CreateNode.js');
        wp_enqueue_script('38598_51320', $this->pluginDir.'/js/questionairy/questions/node/edit/EditNode.js');
        wp_enqueue_script('16950_97241', $this->pluginDir.'/js/questionairy/questions/node/move/MoveNode.js');
        wp_enqueue_script('97064_57211', $this->pluginDir.'/js/questionairy/questions/node/move/MoveNodeDown.js');
        wp_enqueue_script('45344_96959', $this->pluginDir.'/js/questionairy/questions/node/move/MoveNodeUp.js');
        wp_enqueue_script('12426_57999', $this->pluginDir.'/js/questionairy/questions/node/remove/RemoveNode.js');

        wp_enqueue_script('99153_28140', $this->pluginDir.'/js/questionairy/questions/question/Question.js');
        wp_enqueue_script('39768_75808', $this->pluginDir.'/js/questionairy/questions/question/view/IQuestionView.js');
        wp_enqueue_script('1888_80119', $this->pluginDir.'/js/questionairy/questions/question/view/QuestionAdminView.js');
        wp_enqueue_script('27290_25493', $this->pluginDir.'/js/questionairy/questions/question/view/QuestionViewFactory.js');
        wp_enqueue_script('50074_32568', $this->pluginDir.'/js/questionairy/questions/sort/SortChildren.js');
        wp_enqueue_script('14141_17750', $this->pluginDir.'/js/questionairy/questions/utils/HtmlUtil.js');
        wp_enqueue_script('76447_5173', $this->pluginDir.'/js/questionairy/questions/utils/ObjectUtil.js');
        wp_enqueue_script('88937_2069', $this->pluginDir.'/js/questionairy/questions/utils/Sorter.js');
        
        wp_enqueue_script('88937_567788869', $this->pluginDir.'/js/questionairy/questions/question/FirstRootQuestion.js');
        wp_enqueue_script('88937_0057788869', $this->pluginDir.'/js/questionairy/questions/utils/QuestionCollectionCutter.js');

        wp_enqueue_script('29952_91983', $this->pluginDir.'/js/questionairy/QuestionaryAdminInitor.js');
    }
}