<?php


class IndexPage
{
    private $pageData;

    public function __construct()
    {
        $this->pageData = $this->getPageData();
        $this->createBlocks();
    }

    private function getPageData()
    {
        $indexPageDataGetter = new GetIndexPageContent();
        return $indexPageDataGetter->execute();
    }

    private function createBlocks(){
        $indexPageSlider = new IndexPageSlider();

        try{
            $block1 = $this->pageData->get(0);
        }
        catch(Exception $exception){
            $block1 = '';
        }

        try{
            $block2 = $this->pageData->get(1);
        }
        catch(Exception $exception){
            $block2 = '';
        }
        try{
            $block3 = $this->pageData->get(2);
        }
        catch(Exception $exception){
            $block3 = '';
        }

        //$block1WithoutQuotes = StringUtil::unquote($block1);
        //$block1WithoutQuotes = StringUtil::unquote($block1WithoutQuotes);

        $block1_content = apply_filters('the_content', $block1);
        $block3_content = apply_filters('the_content', $block3);

        echo '<div id="pageType" style="display: none;">simplePage</div>';
        //echo '<div class="importantLinksAndPagesBlock indexPageBlock autoOverflow">'.$block1.'</div>';
        echo '<div class="videoBlock indexPageBlock">'.$block1_content.'</div>';

        //echo '<div class="additionsInfoBlock indexPageBlock autoOverflow">'.$block3.'</div>';
        echo '<div class="additionsInfoBlock indexPageBlock autoOverflow">'.$block3_content.'</div>';

        echo '<div class="sliderBlockContainer"><div class="sliderBlock">' .$indexPageSlider->getHTML().'</div></div>';
        //echo '<div class="sliderBlockContainer"></div>';
    }
}